const mbtiArray = [
  "ENTJ",
  "ENTP",
  "ENFJ",
  "ENFP",
  "ESTJ",
  "ESTP",
  "ESFJ",
  "ESFP",
  "INTJ",
  "INTP",
  "INFJ",
  "INFP",
  "ISTJ",
  "ISTP",
  "ISFJ",
  "ISFP",
];

const mbti = mbtiArray.map((type) => ({
  label: type,
  value: type.toLowerCase(),
}));

export default mbti;
