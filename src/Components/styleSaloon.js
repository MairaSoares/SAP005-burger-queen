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
    padding-top: 30px;
    margin-left: 50px;
    border-radius: 25px;
    background-color: white;
    font-weight: bold;
    margin-top:50px;
    position: relative;
    
    
`
export const OrderDetails = styled.div`
    position: relative;
    margin-right: 100px;
    margin-top: 15px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
    padding: 10px;
    border-radius: 0 0 2px 2px;
    background-color: #FFF;

`

export const MainSaloon = styled.div`
    position: relative;
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
  
  background-color: #bdd4e7;
  box-shadow:0 5px 0 #bdd4e7;

  &:hover{
    background: #90d5ec;
    box-shadow:0 5px 0 #90d5ec;
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

    margin-left: 350px;
    width: 200px;
    height: 50px;
    border-radius: 25px;
    background: #57b846;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;

    border: none;
    outline:none;
    background-color: #bdd4e7;
    box-shadow:  -9px 9px 14px rgba(0, 0, 0, 0.5);
    
`

export const ButtonLogout = styled.button`
    margin-left: 900px;
    border: none;
    background-color: Transparent;
    padding-top: 10px;
    
`

export const CardSaloon = styled.div`
    
    margin: 30px;
    margin-bottom: 50px;
    border: ridge 10px rgb(255, 255, 255);

    font-family: "monospace";
    
    font-size: 15px;
    font-weight: 150;
    line-height: 10px;
    letter-spacing: .4px;
    background: #eee;
    padding-top: 15px;
    padding-left: 20px;
    padding-right: 30px;

    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        margin-bottom: 54px;
    }

`

export const TextCard = styled.p`
    background: #FFF;
    padding: 20px;
    min-height: 200px;
    margin-bottom: 0px;
`
export const NameTable = styled.div`

  text-align: right;
  display: inline-block;
  position: absolute;
  width: 250px;
`
export const Summary = styled. div`
    text-align: center;
    margin-top: 40px;
    margin-right: 40px;
    list-style-type: none;
`

export const Total = styled.div`
    text-align: center;
    margin-right: 70px;
`
export const InputSaloon = styled.input`
    border: 0;
    border-bottom: 2px solid #9e9e9e;
    outline: none;
    transition: .2s ease-in-out;
    box-sizing: border-box;
    width: 100%;
    font-size: 1rem;
    

    &:valid{
        border-bottom: 2px solid #bdd4e7;
    }
    
    &:focus{
        border-bottom: 2px solid #bdd4e7;
    }

    &: focus + label {
        color: #bdd4e7;
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