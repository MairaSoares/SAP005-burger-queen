import styled from 'styled-components';


export const SectionMenu = styled.section`

    vertical-align: top;
    display: inline-flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 500px;
    height: 500PX;
    margin-right: 3%;
    padding: 1%;
    padding-top: 35px;
    margin-left: 40px;
    
    font-weight: bold;
    position: relative;
    margin-top: -100px;

    white-space: nowrap;
    background-color: rgba(2, 14, 4, 0.767);
    
    
`
export const OrderDetails = styled.div`
    position: relative;
    margin-right: 200px;
    margin-left: 600px;
    padding: 10px;
    border-radius: 0 0 2px 2px;
    background-color: #e8e8e8;

`

export const ButtonQtd = styled.button`

    color: black;
    font-size: 30px;
    height: 70px;
    margin: 0 10px 0 10px;
    border: none;
    background-color: Transparent;
    

`
export const ButtonMenu = styled.button`

  height: 30px;
  margin-bottom: 10px;
  border: none;
  outline:none;
  font-family: arial;
  font-size:14px;
  text-transform: uppercase;
  font-weight:700;
  padding:10px;
  cursor: pointer;
  display:inline-block;
  text-decoration: none;
  
  background-color: #3CB371;
  box-shadow:0 5px 0 #008000;



  &:hover{
    background: #3CB371;
    box-shadow:0 5px 0 #00FF7F;
  }

  &::active{
    position:relative;
    top:5px;
    box-shadow:none;
  }

  &:focus{
    outline:none;
    border:none;
  }
 
  
  

`
export const ButtonSubmit = styled.button`

    margin-left: 230px;
    height: 50px;
    border-radius: 25px;
    background: #57b846;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;

    border: none;
    outline:none;
    background-color: #3CB371;
    box-shadow:  -9px 9px 14px rgba(0, 0, 0, 0.5);
    
`

export const ButtonLogout = styled.button`
    margin-left: 900px;
    border: none;
    background-color: Transparent;
    padding-top: 10px;
    
`

export const CardSaloon = styled.div`
    
    margin: 10px;
    border: ridge 10px rgb(255, 255, 255);

    font-family: "monospace";
    
    font-size: 15px;
    font-weight: 150;
    line-height: 10px;
    letter-spacing: .4px;
    background: #eee;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 15px;

    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        margin-bottom: 54px;
    }

`

export const Summary = styled. div`
    text-align: center;
    margin-top: 40px;
    margin-right: 40px;
    list-style-type: none;
`

export const Total = styled.div`
    text-align: center;
    display: flex;
    margin-top: -190px;
`
export const InputSaloon = styled.input`
    border: 0;
    border-bottom: 2px solid #3CB371;
    outline: none;
    transition: .2s ease-in-out;
    box-sizing: border-box;
    width: 100%;
    font-size: 1rem;
    background-color: Transparent;
    

    &:valid{
        border-bottom: 2px solid #3CB371;
    }
    
    &:focus{
        border-bottom: 2px solid #3CB371;
    }

    &: focus + label {
        color: #3CB371;
        font-size: .8rem;
        top: -30px;
        pointer-events: none;
    }

`
export const LabelSaloon = styled.label`

  width: 100%;
  height: 3rem;
  font-size: 1rem;
  top: 0;
  left: 0; right: 0;
  color: #616161;
  display: flex;
  align-items: center;
  position: absolute;
  font-size: 1rem;
  cursor: text;
  transition: .2s ease-in-out;
  box-sizing: border-box;
`

export const OrderInfo = styled.aside`

    vertical-align: top;
    display: inline-flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 380px;
    height: 390PX;
    margin-right: 2%;
    padding: 1%;
    padding-top: 25px;
    margin-left: -7px;
    background-color: #e8e8e8;
    font-weight: bold;
    position: relative;
    margin-top: 20px;

`

export const OrderInfo2 = styled.aside`

    vertical-align: top;
    display: inline-flex;
    flex-wrap: wrap;
    overflow-y: auto;
    width: 300px;
    height: 390PX;
    margin-right: 2%;
    padding: 1%;
    padding-top: 25px;
    margin-left: 20px;
    background-color: #e8e8e8;
    font-weight: bold;
    position: relative;
    margin-top: 20px;

`

export const ButtonList = styled.button`

    margin-left: 180px;
    height: 50px;
    border-radius: 25px;
    background: #57b846;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;

    border: none;
    outline:none;
    background-color: #3CB371;
    box-shadow:  -9px 9px 14px rgba(0, 0, 0, 0.5);

`