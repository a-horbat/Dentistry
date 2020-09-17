import { IntuitAuthDocument, useBooleanControls } from "@base86inc/apollo-client";
import { useQuery } from "@apollo/react-hooks"
import { parse } from "querystring";
import isArray from "lodash/isArray";

export function useIntuitAuth() {
  const { data, loading, error } = useQuery(IntuitAuthDocument, {
    variables: {
      redirectUri: window.location.origin
    }
  });
  return { data, loading, error };
}

export function popupParameters() {
  let parameters = "location=1,width=800,height=650";
  parameters +=
    ",left=" + (window.screen.width - 800) / 2 + ",top=" + (window.screen.height - 650) / 2;
  return parameters;
}

export function useIntuitAuthRedirect(
  onSuccess
) {
  const { data, loading, error } = useIntuitAuth();
  const [loggingIn, loggingInControls] = useBooleanControls(false);
  const handleLogin = async () => {
    if (data && data.intuitAuth) {
      // loggingInControls.setTrue();
      const parameters = popupParameters();
      const connectPopup = window.open(
        data.intuitAuth,
        "connectPopup",
        parameters
      );
      const pollOAuth = setInterval(async () => {
        try {
          if (
            !connectPopup ||
            !connectPopup.document &&
            !connectPopup.document.URL
          ) return
          const query = parse(connectPopup.document.URL.split("?")[1]);
          if (query.code) {
            clearInterval(pollOAuth);
            connectPopup.close();
            try {
              if (onSuccess) {
                console.log(query);
                await onSuccess(
                  isArray(query.code) ? query.code.join("") : query.code
                );
              }
            } catch (e) {}
            loggingInControls.setFalse();
          } else if (query.error) {
            clearInterval(pollOAuth);
            connectPopup.close();
            throw new Error(isArray(query.error) ? query.error.join("") : query.error)
          }
        } catch (e) {
          console.log(e);
          loggingInControls.setFalse();
        }
      }, 300);
    }
  };
  return [{ data, error, loading: loading || loggingIn }, handleLogin];
}
