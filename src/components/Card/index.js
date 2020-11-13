import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import has from 'lodash/has';
import upperCase from 'lodash/upperCase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';

import { ICONS } from '@/constants/icons';
import { SUCCESS_TYPE } from '@/constants/variables';
import { addNotification } from '@/redux/slices/notification';
import styles from './styles';

const useStyles = makeStyles(styles);

const EnhancedCard = ({ fullName, description, updatedAt, htmlUrl, homepage, language, forks, watchers, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [favorite, setFavorite] = useState(false);

  const handleClickFavoriteButton = () => {
    setFavorite(favorite => !favorite);
  };

  const handleClickShareButton = () => {
    const element = document.createElement('textarea');
    element.value = htmlUrl;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);

    dispatch(
      addNotification({
        notification: {
          severity: SUCCESS_TYPE,
          message: '已將網址複製到剪貼簿上',
        },
      }),
    );
  };

  const renderLanguageSection = () => {
    if (has(ICONS, language)) {
      return (
        <React.Fragment>
          <Typography variant="body2" color="textSecondary" component="p">
            Language
          </Typography>
          <FontAwesomeIcon icon={ICONS[language]} size="3x" />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Typography variant="body2" color="textSecondary" component="p">
            Language
          </Typography>
          <Typography variant="subtitle1" color="primary" component="p" className={classes.language}>
            {language ? language : '未知'}
          </Typography>
        </React.Fragment>
      );
    }
  };

  return (
    <Grid item lg={4}>
      <Card className={classes.root} {...props}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {fullName && upperCase(fullName.substring(0, 1))}
            </Avatar>
          }
          title={fullName}
          subheader={'最後更新：' + updatedAt}
        />
        <CardContent className={classes.content}>
          <div className={classes.description}>
            <Typography variant="body2" color="textPrimary" component="p">
              {description}
            </Typography>
          </div>
          <Divider className="my-1" />
          <div>
            <Grid container spacing={1}>
              <Grid item xs={4} className="text-center">
                {renderLanguageSection()}
              </Grid>
              <Grid item xs={4} className="text-center">
                <Typography variant="body2" color="textSecondary" component="p">
                  Stars
                </Typography>
                <Typography variant="subtitle1" color="primary" component="p" className={classes.starts}>
                  {watchers}
                </Typography>
              </Grid>
              <Grid item xs={4} className="text-center">
                <Typography variant="body2" color="textSecondary" component="p">
                  Forks
                </Typography>
                <Typography variant="subtitle1" color="primary" component="p" className={classes.forks}>
                  {forks}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          {favorite ? (
            <IconButton aria-label="remove from favorites" color="secondary" onClick={handleClickFavoriteButton}>
              <FavoriteIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="add to favorites" color="secondary" onClick={handleClickFavoriteButton}>
              <FavoriteBorderIcon />
            </IconButton>
          )}
          <IconButton aria-label="share" color="secondary" onClick={handleClickShareButton}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default memo(EnhancedCard);
