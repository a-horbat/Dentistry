import React from "react";
import logo from "./logo.png";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link as ReactLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

export function StepTemplate({ primary, secondary, onRegister, onSignIn }) {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      height="100%"
      maxWidth={600}
      margin="auto"
    >
      <Box flexGrow={1}></Box>
      <div>
        <img src={logo} alt="Base86" style={{ height: 100 }} />
      </div>
      <Box flexGrow={1}></Box>
      <Hidden mdUp>
        <Box flexGrow={2} textAlign="left" paddingLeft={2} paddingRight={7}>
          <Typography variant="h2" style={{ color: "#fff", fontSize: 40 }} paragraph>
            {primary}
          </Typography>
          <Typography variant="h4" style={{ color: "#fff", fontSize: 20 }}>
            {secondary}
          </Typography>
        </Box>
      </Hidden>
      <Hidden smDown>
        <Box flexGrow={2} textAlign="center" px={2}>
          <Typography variant="h3" style={{ color: "#fff" }} paragraph>
            {primary}
          </Typography>
          <Typography variant="h5" style={{ color: "#fff" }}>
            {secondary}
          </Typography>
        </Box>
      </Hidden>
      <Box display="flex" justifyContent="center" mb={3}>
        {onRegister && <Button variant="contained" color="secondary" onClick={onRegister} size="large" style={{ borderRadius: 20 }}>
          <Typography>Register</Typography>
        </Button>}
        {onSignIn && <Box ml={onRegister ? 2 : 0}>
          <Button variant="contained" onClick={onSignIn} size="large" style={{ borderRadius: 20 }}>
            <Typography color="secondary">Sign In</Typography>
          </Button>
        </Box>}
      </Box>
      <Link component={ReactLink} to='/preview'>
        <Typography variant="h6" color="primary"><strong>Take a sneak peek</strong></Typography>
      </Link>
      <Box flexGrow={1}></Box>
    </Box>
  );
}
