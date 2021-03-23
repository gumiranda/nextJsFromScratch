import {extendTheme} from '@chakra-ui/react';
import {css} from '@emotion/react';

const colors = {
  purple: {
    400: '#8257e5',
  },
};
export default extendTheme({
  colors,
  styles: {
    global: css`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&family=Roboto&display=swap');
      :root {
        --white: #fff;
        --background: #8257e5;
        --gray-line: #dcdde0;
        --text: #666666;
        --text-highlight: #b3b9ff;
        --title: #2e384d;
        --red: #e83f5b;
        --green: #4cd62b;
        --blue: #5965e0;
        --blue-dark: #4953b8;
        --blue-twitter: #2aa9e0;
      }

      body,
      button {
        // font-weight: 400;
        font-family: 'Poppins', sans-serif;
      }
      * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
      }
      body {
        background: #c2c6cf;
        color: #555;
      }
      *:focus {
        outline: 0;
      }

      html,
      body {
        //background: linear-gradient(-90deg, #8257e5, #7159c1);
        background: linear-gradient(-90deg, #fff, #fff0);
        //height: 100%;
      }

      body {
        -webkit-font-smoothing: antialiased !important;
      }
      @media (max-width: 1080px) {
        html {
          font-size: 93.75%;
        }
      }
      @media (max-width: 720px) {
        html {
          font-size: 87.5%;
        }
      }

      body,
      input,
      textarea,
      button {
        color: #222;
        font-size: 1rem; //16px;
        font-family: 'Poppins', Arial, Helvetica, sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      ul {
        list-style: none;
      }
      button {
        cursor: pointer;
      }
      //1rem === 16px
    `,
  },
});
