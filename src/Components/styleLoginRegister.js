import styled from 'styled-components';


export const ButtonForm = styled.input`

    font-family: Montserrat-Bold;
    line-height: 1.5;
    color: #fff;
    text-transform: uppercase;

    width: 200px;
    height: 50px;
    border-radius: 25px;
    background: #57b846;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

    
    cursor: pointer;
    border: none;
    font-size: 20px;
    outline:none;
    background-color: #ba9a8e;
    background-image: linear-gradient(315deg, #ba9a8e 0%, #96705b 74%);
    box-shadow:  -9px 9px 14px rgba(0, 0, 0, 0.5),
            9px -9px 14px #ffffff;
    
    &:hover {
        background: #333333;
    }
`;

export const WriteForm = styled.input`

    font-family: monospace;
    font-size: 15px;
    line-height: 1.5;
    color: #666666;

    display: block;
    width: 100%;
    background: #e6e6e6;
    height: 50px;
    border-radius: 25px;
    padding: 0 30px 0 68px;
    
    box-shadow: inset 6px 6px 10px 0 rgba(0, 0, 0, 0.5),
    inset -6px -6px 10px 0 rgba(255, 255, 255, 0.9);
    border: none;
    outline:none;
    background: linear-gradient(225deg, #b4b4b7, #d6d6d9);
`
export const TittleForm = styled.title`

  font-family: Poppins-Bold;
  font-size: 24px;
  text-align: center;
  color: #708090;

  width: 100%;
  display: block;
  padding-bottom: 5px;
  font-weight: 900;
`
export const HeightLogin = styled.div`
    margin-top: 50px;
    color: #708090;
    font-weight: bold; 
`
export const HeightRegister = styled.div `
    margin-top: 0px;
    color: #708090;
    font-weight: bold; 
`

export const DivCenter = styled.div`
    width: 300px;
    margin-left: 40px;

`
export const InputRadio = styled.input`
    margin: 4px 4px 4px 10px;
   
`
export const DivRouter1 = styled.div`
    padding-left: 30px;
    padding-top: 20px;
   
`;

export const DivRouter2 = styled.div`
    padding-left: 0px;
    padding-top: 20px;
   
`;

export const ConfigForm = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 300px;
  height: 550px;
`