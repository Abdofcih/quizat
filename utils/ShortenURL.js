import axios from "axios";

const shortenURL = async resourceId => {
  console.log(resourceId);

  const token = process.env.BITLY_TOKEN;
  const bitlyAPI = "https://api-ssl.bitly.com/v4/shorten";
  const baseURL = "https://quizat-reactjs.netlify.app/quiz/";
  const long_url = `${baseURL}${resourceId}`;
  //https://react-english-quiz.netlify.app/633e0049b524a48ec3acd5ea
  try {
    const { data } = await axios.post(
      bitlyAPI,
      {
        domain: "bit.ly",
        long_url: long_url
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (error) {
    return { link: long_url };
  }
};

export default shortenURL;
