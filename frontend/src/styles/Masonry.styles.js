import { makeStyles } from '@mui/styles';

const useMasonryStyles = makeStyles((theme) => ({
  iconButtonCheck:{
    color: '#009927'
  },
  iconButtonClear:{
    color: '#cc4749'
  },
  iconButton:{
    padding:0,
    margin:0
  },
  messageCard: {
    // border:2,
    padding: 15,
    paddingRight: 40,
    borderColor: "#A4A4A4",
    position: "relative",
  },
  adminBox: {
    position: "absolute",
    right: 5,
    top: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  masonryBox: {
    width: 1000,
    minHeight: 500,
    display: "flex",
    justifyContent: "center",
    padding: 2,
  }
  


}));

export default useMasonryStyles;
