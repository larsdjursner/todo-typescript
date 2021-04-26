import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import logo from "../static/images/thumbs-up-guy.svg";
import { CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  root: { maxWidth: 400 },
  media: {},
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.root}>
        <CardMedia component="img" image={logo} title="thumbs up " />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Good job! All todos are done!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
