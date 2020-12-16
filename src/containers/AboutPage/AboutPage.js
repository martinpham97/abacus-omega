import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Link,
} from "@material-ui/core";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import useStyles from "./styles";

export const SettingsPage = () => {
  const classes = useStyles();
  const { t } = useTranslation(["app", "pages"]);

  const appName = t("app:title", "Abacus Omega");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title={t("pages:about.title", "About")} />
          <CardContent>
            <Typography variant="h6">
              {t("pages:about.project.what", {
                app: appName,
                defaultValue: `What is ${appName}?`,
              })}
            </Typography>
            <Typography variant="body1">
              {t("pages:about.project.what_answer", {
                app: appName,
                defaultValue: `${appName} is a simple grade calculator for students to know the
                minimum grade to reach their desired course results.`,
              })}
            </Typography>
            <br />
            <Typography variant="h6">
              {t("pages:about.project.why", {
                app: appName,
                defaultValue: `Why ${appName}?`,
              })}
            </Typography>
            <Typography variant="body1">
              {t(
                "pages:about.project.why_answer_1",
                "As a student myself, I often struggle when managing multiple courses while I was in University.",
              )}
            </Typography>
            <Typography variant="body1">
              {t(
                "pages:about.project.why_answer_2",
                "This web application is made in hope that it will simplify the process of managing courses so that you can focus on achieving your goal.",
              )}
            </Typography>
            <br />
            <Typography variant="h6">
              {t(
                "pages:about.project.how",
                "How do I contribute to this project?",
              )}
            </Typography>
            <Typography variant="body1">
              {t(
                "pages:about.project.how_answer",
                "This project's repository is hosted publicly on",
              )}{" "}
              <Link href="https://github.com/martinpham97/abacus-omega">
                Github
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader title={t("pages:about.author.title", "Author")} />
          <CardContent>
            <Typography variant="h6">
              {t("pages:about.author.who", "Who am I?")}
            </Typography>
            <Typography variant="body1">
              {t(
                "pages:about.author.who_answer_1",
                "I am a Computer Science graduate from UNSW.",
              )}
            </Typography>
            <Typography variant="body1">
              {t(
                "pages:about.author.who_answer_2",
                "My interests include: making web applications with React, bowling and video games.",
              )}
            </Typography>
            <br />
            <Typography variant="h6">
              {t("pages:about.author.how", "How do I contact you?")}
            </Typography>
            <Typography variant="body1">
              {t(
                "pages:about.author.how_answer",
                "You can contact me through the social media links below:",
              )}
            </Typography>
            <Grid container>
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="facebook-link"
                  href="https://www.facebook.com/anhtupham.97/"
                >
                  <FacebookIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="instagram-link"
                  href="https://www.instagram.com/anhtu.pham/"
                >
                  <InstagramIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  color="primary"
                  aria-label="linkedin-link"
                  href="https://www.linkedin.com/in/le-anh-tu-pham-181992112/"
                >
                  <LinkedInIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SettingsPage;
