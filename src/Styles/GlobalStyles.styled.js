import { createGlobalStyle } from "styled-components";

const Globalstyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
        color: ${(props) => props.theme.colors.colorFogra};
        ${
          "" /* background-color: ${(props) => props.theme.colors.colorCultured}; */
        }
        background-color: rgba(4,4,4,0.9);
        font-size: 1.15em;
        font-family: 'Nunito Sans', sans-serif;
        ${"" /* font-family: 'Crimson Pro', "sans-serif"; */}
        /* font-family: "poppins", "sans-serif"; */
    }

    p {
      line-height: 1.5;
      margin: 0;
    }
    
    img {
      max-width: 100%;
      max-height: 100%;
    }
`;

export default Globalstyles;
