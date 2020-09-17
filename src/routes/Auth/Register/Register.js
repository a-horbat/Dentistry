import React, { useState } from 'react';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { NavLink, Redirect } from 'react-router-dom';
import { auth } from 'firebase/app';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleConnect } from '../../../components/GoogleConnect';
import { client } from '../../../client';
import { useAuthStyles } from '../style';
import { useButtonStyles } from '../../../MUIStyles/General';
import Base86Modal from '../../../components/Modal';
import Input from '../../../components/Input';

const useStyles = makeStyles({
  link: {
    color: 'rgb(45, 156, 219)',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
});

const Register = () => {
  const classes = Object.assign(useAuthStyles(), useButtonStyles());
  const registeredClasses = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onGoogleAuth = async () => {
    try {
      const provider = new auth.GoogleAuthProvider();
      await auth().signInWithPopup(provider);
      setLoading(true);
      setRedirect(true);
      await client.resetStore();
    } catch (err) {
      setError(err.message);
    }
  };

  const onSubmitEmailPassword = async (email, password) => {
    console.log(email, password, 'register email password');
    try {
      setLoading(true);

      await auth().createUserWithEmailAndPassword(email, password);

      await client.resetStore();
      setLoading(false);
      setRedirect(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    //console.log(email, 'email');
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    //console.log('password  change', password);
  };
  const handleClick = () => {
    onSubmitEmailPassword(email, password);
  };

  if (redirect) {
    return <Redirect to="/products" />;
  }
  return (
    <>
      <h1 className={classes.title}>Register</h1>
      <span className={classes.note}>
        Already have an account? <NavLink to="/auth/sign-in">Sign In</NavLink>
      </span>
      <div style={{ maxWidth: '500px', width: '100%', minWidth: '400px' }}>
        <div className={classes.inputsContainer}>
          <Input
            handleChange={(e) => console.log(e)}
            id="registry_first-name"
            placeholder="Name"
            labelText="First Name"
            type="text"
            width="medium"
            Icon={PermIdentityOutlinedIcon}
          />
          <Input
            handleChange={(e) => console.log(e)}
            id="registry_last-name"
            placeholder="Last Name"
            labelText="Last Name"
            type="text"
            width="medium"
            Icon={PermIdentityOutlinedIcon}
          />
          <Input
            handleChange={(e) => console.log(e)}
            id="registry_organization-name"
            placeholder="Organization Name"
            labelText="Organization Name"
            type="text"
            width="large"
            Icon={BusinessRoundedIcon}
          />
          <Input
            handleChange={(e) => handleChangeEmail(e)}
            id="registry_email"
            placeholder="Email"
            labelText="Email"
            type="text"
            width="large"
            Icon={MailOutlineRoundedIcon}
          />
          <Input
            handleChange={(e) => handleChangePassword(e)}
            value={password}
            id="registry_password"
            placeholder="Password"
            labelText="Password"
            type="password"
            width="large"
            Icon={LockOpenRoundedIcon}
          />
        </div>

        <span className={classes.termsOfUse}>
          By creating an account, I agree with the{' '}
          <a
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Terms of Service and Privacy Policy
          </a>
          .
        </span>

        <div className={classes.buttonsContainer}>
          <Button
            onClick={handleClick}
            className={classes.primaryButton}
            style={{ width: '47%' }}
          >
            Create account
          </Button>
          <Button className={classes.secondaryButton} style={{ width: '47%' }}>
            Try a sneak peek
          </Button>
        </div>
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}

        <span className={classes.createWith}>Or create account with</span>

        <GoogleConnect onClick={onGoogleAuth} />
      </div>
      <Base86Modal
        title="Terms and Privacy Policy"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cancelText="Close"
        showSubmit={false}
        size="m"
      >
        <Typography className={classes.termsText}>
          <b>
            1. <u>Introduction</u>
          </b>
          <br />
          Welcome to <b>base86, inc. (“Company”, “we”, “our”, “us”)!</b> As you
          have just clicked our Terms of Service, please pause, grab a cup of
          coffee and carefully read the following pages. It will take you
          approximately 20 minutes.
          <br />
          <br />
          These Terms of Service <b>(“Terms”, “Terms of Service”)</b> govern
          your use of our web pages located at{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('http://base86.com', '_blank');
            }}
          >
            http://base86.com
          </span>{' '}
          operated by base86, inc.
          <br />
          <br />
          Your agreement with us includes these Terms <b>(“Agreements”).</b> You
          acknowledge that you have read and understood Agreements, and agree to
          be bound by them.
          <br />
          <br />
          If you do not agree with (or cannot comply with) Agreements, then you
          may not use the Service, but please let us know by emailing
          hello@base86.com so we can try to find a solution. These Terms apply
          to all visitors, users and others who wish to access or use Service.
          <br />
          <br />
          Thank you for being responsible.
          <br />
          <br />
          <b>
            2. <u>Communications</u>
          </b>
          <br />
          By creating an Account on our Service, you agree to subscribe to
          newsletters, marketing or promotional materials and other information
          we may send. However, you may opt out of receiving any, or all, of
          these communications from us by following the unsubscribe link or by
          emailing at.
          <br />
          <br />
          <b>
            3. <u>Purchases</u>
          </b>
          <br />
          If you wish to purchase any product or service made available through
          Service (“Purchase”), you may be asked to supply certain information
          relevant to your Purchase including, without limitation, your credit
          card number, the expiration date of your credit card, your billing
          address, and your shipping information.
          <br />
          <br />
          You represent and warrant that: (i) you have the legal right to use
          any credit card(s) or other payment method(s) in connection with any
          Purchase; and that (ii) the information you supply to us is true,
          correct and complete.
          <br />
          <br />
          We may employ the use of third party services for the purpose of
          facilitating payment and the completion of Purchases. By submitting
          your information, you grant us the right to provide the information to
          these third parties.
          <br />
          <br />
          We reserve the right to refuse or cancel your order at any time for
          reasons including but not limited to: product or service availability,
          errors in the description or price of the product or service, error in
          your order or other reasons.
          <br />
          <br />
          We reserve the right to refuse or cancel your order if fraud or an
          unauthorized or illegal transaction is suspected.
          <br />
          <br />
          <b>
            4. <u>Subscriptions</u>
          </b>
          <br />
          Some parts of Service are billed on a subscription basis (
          <b>“Subscription(s)”</b>). You will be billed in advance on a
          recurring and periodic basis (<b>“Billing Cycle”</b>). Billing cycles
          are set either on a monthly or annual basis, depending on the type of
          subscription plan you select when purchasing a Subscription.
          <br />
          <br />
          At the end of each Billing Cycle, your Subscription will automatically
          renew under the exact same conditions unless you cancel it or base86,
          inc. cancels it. You may cancel your Subscription renewal either
          through your online account management page or by contacting base86,
          inc. customer support team.
          <br />
          <br />
          A valid payment method, including a credit card, is required to
          process the payment for your subscription. You shall provide base86,
          inc. with accurate and complete billing information including full
          name, address, state, zip code, telephone number, and a valid payment
          method information. By submitting such payment information, you
          automatically authorize base86, inc. to charge all Subscription fees
          incurred through your account to any such payment instruments.
          <br />
          <br />
          Should automatic billing fail to occur for any reason, base86, inc.
          will issue an electronic invoice indicating that you must proceed
          manually, within a certain deadline date, with the full payment
          corresponding to the billing period as indicated on the invoice.
          <br />
          <br />
          <b>
            5. <u>Free Trial</u>
          </b>
          <br />
          base86, inc. may, at its sole discretion, offer a Subscription with a
          free trial for a limited period of time (<b>“Free Trial”</b>).
          <br />
          <br />
          You may be required to enter your billing information in order to sign
          up for Free Trial.
          <br />
          <br />
          If you enter your billing information when signing up for Free Trial,
          you will not be charged by base86, inc. until the Free Trial has
          expired. On the last day of Free Trial period, unless you cancelled
          your Subscription, you will be automatically charged the applicable
          Subscription fees for the type of Subscription you have selected.
          <br />
          <br />
          At any time and without notice, base86, inc. reserves the right to (i)
          modify Terms of Service of Free Trial offer, or (ii) cancel such Free
          Trial offer.
          <br />
          <br />
          <b>
            6. <u>Fee Changes</u>
          </b>
          <br />
          base86, inc., in its sole discretion and at any time, may modify
          Subscription fees for the Subscriptions. Any Subscription fee change
          will become effective at the end of the then-current Billing Cycle.
          <br />
          <br />
          base86, inc. will provide you with a reasonable prior notice of any
          change in Subscription fees to give you an opportunity to terminate
          your Subscription before such change becomes effective.
          <br />
          <br />
          Your continued use of Service after Subscription fee change comes into
          effect constitutes your agreement to pay the modified Subscription fee
          amount.
          <br />
          <br />
          <b>
            7. <u>Refunds</u>
          </b>
          <br />
          Except when required by law, paid Subscription fees are
          non-refundable.
          <br />
          <br />
          <b>
            8. <u>Content</u>
          </b>
          <br />
          Our Service allows you to post, link, store, share and otherwise make
          available certain information, text, graphics, videos, or other
          material (<b>“Content”</b>). You are responsible for Content that you
          post on or through Service, including its legality, reliability, and
          appropriateness.
          <br />
          <br />
          By posting Content on or through Service, You represent and warrant
          that: (i) Content is yours (you own it) and/or you have the right to
          use it and the right to grant us the rights and license as provided in
          these Terms, and (ii) that the posting of your Content on or through
          Service does not violate the privacy rights, publicity rights,
          copyrights, contract rights or any other rights of any person or
          entity. We reserve the right to terminate the account of anyone found
          to be infringing on a copyright.
          <br />
          <br />
          You retain any and all of your rights to any Content you submit, post
          or display on or through Service and you are responsible for
          protecting those rights. We take no responsibility and assume no
          liability for Content you or any third party posts on or through
          Service. However, by posting Content using Service you grant us the
          right and license to use, modify, publicly perform, publicly display,
          reproduce, and distribute such Content on and through Service. You
          agree that this license includes the right for us to make your Content
          available to other users of Service, who may also use your Content
          subject to these Terms.
          <br />
          <br />
          base86, inc. has the right but not the obligation to monitor and edit
          all Content provided by users.
          <br />
          <br />
          In addition, Content found on or through this Service are the property
          of base86, inc. or used with permission. You may not distribute,
          modify, transmit, reuse, download, repost, copy, or use said Content,
          whether in whole or in part, for commercial purposes or for personal
          gain, without express advance written permission from us.
          <br />
          <br />
          <b>
            9. <u>Prohibited</u>
          </b>
          <br />
          Uses You may use Service only for lawful purposes and in accordance
          with Terms. You agree not to use Service:
          <br />
          <br />
          (a) In any way that violates any applicable national or international
          law or regulation.
          <br />
          <br />
          (b) For the purpose of exploiting, harming, or attempting to exploit
          or harm minors in any way by exposing them to inappropriate content or
          otherwise.
          <br />
          <br />
          (c) To transmit, or procure the sending of, any advertising or
          promotional material, including any “junk mail”, “chain letter,”
          “spam,” or any other similar solicitation.
          <br />
          <br />
          (d) To impersonate or attempt to impersonate Company, a Company
          employee, another user, or any other person or entity.
          <br />
          <br />
          (e) In any way that infringes upon the rights of others, or in any way
          is illegal, threatening, fraudulent, or harmful, or in connection with
          any unlawful, illegal, fraudulent, or harmful purpose or activity.
          <br />
          <br />
          (f) To engage in any other conduct that restricts or inhibits anyone’s
          use or enjoyment of Service, or which, as determined by us, may harm
          or offend Company or users of Service or expose them to liability.
          <br />
          <br />
          Additionally, you agree not to:
          <br />
          <br />
          (a) Use Service in any manner that could disable, overburden, damage,
          or impair Service or interfere with any other party’s use of Service,
          including their ability to engage in real time activities through
          Service.
          <br />
          <br />
          (b) Use any robot, spider, or other automatic device, process, or
          means to access Service for any purpose, including monitoring or
          copying any of the material on Service.
          <br />
          <br />
          (c) Use any manual process to monitor or copy any of the material on
          Service or for any other unauthorized purpose without our prior
          written consent.
          <br />
          <br />
          (d) Use any device, software, or routine that interferes with the
          proper working of Service.
          <br />
          <br />
          (e) Introduce any viruses, trojan horses, worms, logic bombs, or other
          material which is malicious or technologically harmful.
          <br />
          <br />
          (f) Attempt to gain unauthorized access to, interfere with, damage, or
          disrupt any parts of Service, the server on which Service is stored,
          or any server, computer, or database connected to Service.
          <br />
          <br />
          (g) Attack Service via a denial-of-service attack or a distributed
          denial-of-service attack.
          <br />
          <br />
          (h) Take any action that may damage or falsify Company rating.
          <br />
          <br />
          (i) Otherwise attempt to interfere with the proper working of Service.
          <br />
          <br />
          <b>
            10. <u>Analytics</u>
          </b>
          <br />
          <br />
          We may use third-party Service Providers to monitor and analyze the
          use of our Service.
          <br />
          <br />
          <b>Google Analytics</b>
          <br />
          Google Analytics is a web analytics service offered by Google that
          tracks and reports website traffic. Google uses the data collected to
          track and monitor the use of our Service. This data is shared with
          other Google services. Google may use the collected data to
          contextualise and personalise the ads of its own advertising network.
          <br />
          <br />
          For more information on the privacy practices of Google, please visit
          the Google Privacy Terms web page:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://policies.google.com/privacy?hl=en');
            }}
          >
            https://policies.google.com/privacy?hl=en
          </span>
          <br />
          <br />
          We also encourage you to review the Google's policy for safeguarding
          your data:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open(
                'https://support.google.com/analytics/answer/6004245',
              );
            }}
          >
            https://support.google.com/analytics/answer/6004245
          </span>
          .
          <br />
          <br />
          <b>Firebase</b>
          <br />
          Firebase is an analytics service provided by Google Inc.
          <br />
          <br />
          You may opt-out of certain Firebase features through your mobile
          device settings, such as your device advertising settings or by
          following the instructions provided by Google in their Privacy Policy:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://policies.google.com/privacy?hl=en');
            }}
          >
            https://policies.google.com/privacy?hl=en
          </span>
          <br />
          <br />
          For more information on what type of information Firebase collects,
          please visit the Google Privacy Terms web page:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://policies.google.com/privacy?hl=en');
            }}
          >
            https://policies.google.com/privacy?hl=en
          </span>
          <br />
          <br />
          <b>Cloudflare analytics</b>
          <br />
          Cloudflare analytics is a web analytics service operated by Cloudflare
          Inc. Read the Privacy Policy here:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://www.cloudflare.com/privacypolicy/');
            }}
          >
            https://www.cloudflare.com/privacypolicy/
          </span>
          <br />
          <br />
          <b>Flurry Analytics Flurry</b>
          <br />
          Analytics service is provided by Yahoo! Inc.
          <br />
          <br />
          You can opt-out from Flurry Analytics service to prevent Flurry
          Analytics from using and sharing your information by visiting the
          Flurry's Opt-out page:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://dev.flurry.com/secure/optOut.do');
            }}
          >
            https://dev.flurry.com/secure/optOut.do
          </span>
          <br />
          <br />
          For more information on the privacy practices and policies of Yahoo!,
          please visit their Privacy Policy page:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open(
                'https://policies.yahoo.com/us/en/yahoo/privacy/policy/index.htm',
              );
            }}
          >
            https://policies.yahoo.com/us/en/yahoo/privacy/policy/index.htm
          </span>
          <br />
          <br />
          <b>Mixpanel</b>
          <br />
          Mixpanel is provided by Mixpanel Inc.
          <br />
          <br />
          You can prevent Mixpanel from using your information for analytics
          purposes by opting-out. To opt-out of Mixpanel service, please visit
          this page:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://mixpanel.com/optout/');
            }}
          >
            https://mixpanel.com/optout/
          </span>
          <br />
          <br />
          For more information on what type of information Mixpanel collects,
          please visit the Terms of Use page of Mixpanel:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://mixpanel.com/terms/');
            }}
          >
            https://mixpanel.com/terms/
          </span>
          <br />
          <br />
          <b>
            11. <u>No Use By Minors</u>
          </b>
          <br />
          Service is intended only for access and use by individuals at least
          eighteen (18) years old. By accessing or using any of the Company
          resources, you warrant and represent that you are at least eighteen
          (18) years of age and with the full authority, right, and capacity to
          enter into this agreement and abide by all of the terms and conditions
          of Terms. If you are not at least eighteen (18) years old, you are
          prohibited from both the access and usage of Service.
          <br />
          <br />
          <b>
            12. <u>Accounts</u>
          </b>
          <br />
          When you create an account with us, you guarantee that you are above
          the age of 18, and that the information you provide us is accurate,
          complete, and current at all times. Inaccurate, incomplete, or
          obsolete information may result in the immediate termination of your
          account on Service.
          <br />
          <br />
          You are responsible for maintaining the confidentiality of your
          account and password, including but not limited to the restriction of
          access to your computer and/or account. You agree to accept
          responsibility for any and all activities or actions that occur under
          your account and/or password, whether your password is with our
          Service or a third-party service. You must notify us immediately upon
          becoming aware of any breach of security or unauthorized use of your
          account.
          <br />
          <br />
          You may not use as a username the name of another person or entity or
          that is not lawfully available for use, a name or trademark that is
          subject to any rights of another person or entity other than you,
          without appropriate authorization. You may not use as a username any
          name that is offensive, vulgar or obscene.
          <br />
          <br />
          We reserve the right to refuse service, terminate accounts, remove or
          edit content, or cancel orders in our sole discretion.
          <br />
          <br />
          <b>
            13. <u>Intellectual</u>
          </b>
          <br />
          Property Service and its original content (excluding Content provided
          by users), features and functionality are and will remain the
          exclusive property of base86, inc. and its licensors. Service is
          protected by copyright, trademark, and other laws of the United States
          and foreign countries. Our trademarks and trade dress may not be used
          in connection with any product or service without the prior written
          consent of base86, inc..
          <br />
          <br />
          <b>
            14. <u>Error Reporting and Feedback</u>
          </b>
          <br />
          You may provide us either directly at hello@base86.com or via third
          party sites and tools with information and feedback concerning errors,
          suggestions for improvements, ideas, problems, complaints, and other
          matters related to our Service (<b>“Feedback”</b>). You acknowledge
          and agree that: (i) you shall not retain, acquire or assert any
          intellectual property right or other right, title or interest in or to
          the Feedback; (ii) Company may have development ideas similar to the
          Feedback; (iii) Feedback does not contain confidential information or
          proprietary information from you or any third party; and (iv) Company
          is not under any obligation of confidentiality with respect to the
          Feedback. In the event the transfer of the ownership to the Feedback
          is not possible due to applicable mandatory laws, you grant Company
          and its affiliates an exclusive, transferable, irrevocable,
          free-of-charge, sub-licensable, unlimited and perpetual right to use
          (including copy, modify, create derivative works, publish, distribute
          and commercialize) Feedback in any manner and for any purpose.
          <br />
          <br />
          The third party sites and tools mentioned above include the following:
          <br />
          <br />
          <b>Firebase Crashlytics Firebase</b>
          <br />
          Crashlytics is a bug reporting service provided by Google Inc.
          <br />
          <br />
          You may opt-out of certain Firebase features through your mobile
          device settings, such as your device advertising settings or by
          following the instructions provided by Google in their Privacy Policy:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://policies.google.com/privacy?hl=en');
            }}
          >
            https://policies.google.com/privacy?hl=en
          </span>
          <br />
          <br />
          For more information on what type of information Firebase collects,
          please visit the Google Privacy Terms web page:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('https://policies.google.com/privacy?hl=en');
            }}
          >
            https://policies.google.com/privacy?hl=en
          </span>
          <br />
          <br />
          <b>
            15. <u>Links To Other Websites</u>
          </b>
          <br />
          Our Service may contain links to third party web sites or services
          that are not owned or controlled by base86, inc.
          <br />
          <br />
          base86, inc. has no control over, and assumes no responsibility for
          the content, privacy policies, or practices of any third party web
          sites or services. We do not warrant the offerings of any of these
          entities/individuals or their websites.
          <br />
          <br />
          YOU ACKNOWLEDGE AND AGREE THAT BASE86, INC. SHALL NOT BE RESPONSIBLE
          OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR
          ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON
          ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH
          THIRD PARTY WEB SITES OR SERVICES. WE STRONGLY ADVISE YOU TO READ THE
          TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR
          SERVICES THAT YOU VISIT.
          <br />
          <br />
          <b>
            16. <u>Disclaimer Of Warranty</u>
          </b>
          <br />
          THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS
          AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF
          ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES,
          OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU
          EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND
          ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.
          <br />
          <br />
          NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY
          WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY,
          RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES.
          WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED
          WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT,
          OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE
          ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE
          CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE
          FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR
          ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE
          MEET YOUR NEEDS OR EXPECTATIONS.
          <br />
          <br />
          COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS
          OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY
          WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR
          PARTICULAR PURPOSE.
          <br />
          <br />
          THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED
          OR LIMITED UNDER APPLICABLE LAW.
          <br />
          <br />
          <b>
            17. <u>Limitation Of Liability</u>
          </b>
          <br />
          EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
          DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE,
          SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES
          (INCLUDING ATTORNEYS' FEES AND ALL RELATED COSTS AND EXPENSES OF
          LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER
          OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION
          OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF
          OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY
          CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS
          AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL
          LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN
          PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS
          PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY,
          IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR
          SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR
          PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION
          OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR
          LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
          <br />
          <br />
          <b>
            18. <u>Termination</u>
          </b>
          <br /> We may terminate or suspend your account and bar access to
          Service immediately, without prior notice or liability, under our sole
          discretion, for any reason whatsoever and without limitation,
          including but not limited to a breach of Terms.
          <br />
          If you wish to terminate your account, you may simply discontinue
          using Service.
          <br />
          All provisions of Terms which by their nature should survive
          termination shall survive termination, including, without limitation,
          ownership provisions, warranty disclaimers, indemnity and limitations
          of liability.
          <br />
          <br />
          <b>
            19. <u>Governing Law</u>
          </b>
          <br />
          These Terms shall be governed and construed in accordance with the
          laws of the State of Delaware without regard to its conflict of law
          provisions.
          <br />
          <br />
          Our failure to enforce any right or provision of these Terms will not
          be considered a waiver of those rights. If any provision of these
          Terms is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect. These Terms
          constitute the entire agreement between us regarding our Service and
          supersede and replace any prior agreements we might have had between
          us regarding Service.
          <br />
          <br />
          <b>
            20. <u>Changes To Service</u>
          </b>
          <br />
          We reserve the right to withdraw or amend our Service, and any service
          or material we provide via Service, in our sole discretion without
          notice. We will not be liable if for any reason all or any part of
          Service is unavailable at any time or for any period. From time to
          time, we may restrict access to some parts of Service, or the entire
          Service, to users, including registered users.
          <br />
          <br />
          <b>
            21. <u>Amendments To Terms</u>
          </b>
          <br />
          We may amend Terms at any time by posting the amended terms on this
          site. It is your responsibility to review these Terms periodically.
          <br />
          <br />
          Your continued use of the Platform following the posting of revised
          Terms means that you accept and agree to the changes. You are expected
          to check this page frequently so you are aware of any changes, as they
          are binding on you.
          <br />
          <br />
          By continuing to access or use our Service after any revisions become
          effective, you agree to be bound by the revised terms. If you do not
          agree to the new terms, you are no longer authorized to use Service.
          <br />
          <br />
          <b>
            22. <u>Waiver And Severability</u>
          </b>
          <br />
          No waiver by Company of any term or condition set forth in Terms shall
          be deemed a further or continuing waiver of such term or condition or
          a waiver of any other term or condition, and any failure of Company to
          assert a right or provision under Terms shall not constitute a waiver
          of such right or provision.
          <br />
          <br />
          If any provision of Terms is held by a court or other tribunal of
          competent jurisdiction to be invalid, illegal or unenforceable for any
          reason, such provision shall be eliminated or limited to the minimum
          extent such that the remaining provisions of Terms will continue in
          full force and effect.
          <br />
          <br />
          <b>
            23. <u>Acknowledgement</u>
          </b>
          <br />
          BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE
          THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY
          THEM.
          <br />
          <br />
          <b>
            24. <u>Contact Us</u>
          </b>
          <br />
          Please send your feedback, comments, requests for technical support:
          <br />
          By email:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('mailto:hello@base86.com');
            }}
          >
            hello@base86.com
          </span>
          .
          <br />
          By visiting this page on our website:{' '}
          <span
            className={registeredClasses.link}
            onClick={() => {
              window.open('http://base86.com');
            }}
          >
            http://base86.com
          </span>
          .
        </Typography>
      </Base86Modal>
    </>
  );
};

export default Register;
