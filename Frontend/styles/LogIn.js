import fonts from "../theme/fonts";

const styles = {
  logInContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    width: 330,
    alignSelf: "center",
  },
  logInText: {
    fontSize: 25,
    color: "#353535",
    marginBottom: 20,
    fontFamily: fonts.extraBold,
  },
  logInBtn:{
    width: 250,
    alignSelf: "center",
    marginTop: 30,
  },

  //input boxes

  input: {
    height: 40,
    borderColor: "#3535358C",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 17,
  },
  inputTitle: {
    color: "#3535358C",
    fontSize: 15,
    marginBottom: 7,
  },

  //GateWay en logo

  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 40,
    marginBottom: 20,
    alignSelf: "center",
  },
  welkomText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#353535",
    width: 300,
    textAlign: "center",
    margin: "auto",
    marginBottom: 70,
  },

    //Other options

 otherOptions:{
    marginTop: 10,
 },
 questionContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 250,
    alignSelf: "center",
    margin: 5,
 },
 question:{
    fontWeight: "bold",
    color: "#353535",
 },

 link:{
    color: "#007BFF",
    textDecorationLine: "underline",
 }
};
export default styles;
