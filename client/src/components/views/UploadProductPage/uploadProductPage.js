import React, {useState} from 'react'
import {Typography, Button, Input} from 'antd'
import FileUpload from "../../utils/fileUpload";
import Axios from 'axios';
const continentList = [
    {key:1, value: "Africa"},
    {key:2, value: "Europe"},
    {key:3, value: "Asia"},
    {key:4, value: "Antarcatica"},
    {key:5, value: "North America"},
    {key:6, value: "South America"},
    {key:7, value: "Australia"},
]
const { Title } = Typography;
const { TextArea } = Input;
const UploadProductPage=(props)=> {
    const [{ title, description, price }, setState] = useState({ title: "", description: "", price: 0 });
    const [ continent, setContinentValue] = useState(1);
    const [Images, setImages] = useState([])
    function handleTextFieldChange({ target: { name, value } }) {
      setState(prevState => ({ ...prevState, [name]: value }));
    }
    const onContinentChange = (event) => {
        setContinentValue(event.currentTarget.value)
    }
    const uploadImages = (newImages) => {
        setImages(newImages);
    }
    const productData = {
        writer: props.user.userData ? props.user.userData._id: "",
        title: title,
        description: description,
        price: price,
        images: Images,
        continent: continent,
    }
    const submitForm = (e) => {
        e.preventDefault();
        Axios.post('api/product/uploadProduct', productData).then((res)=>{
            if(res.data.success){
                alert('product uploaded successfully');
                props.history.push("/");
            }else{
                alert('failed to upload the product');
            }
        })
    }
    return (
        <div style={{maxWidth:"700px", margin: "2rem auto"}}>
            <div style={{textAlign: "center", marginBottom: "2rem"}}>
                <Title >Upload Travel Product</Title>
            </div>
            <FileUpload 
            refreshFunction = {uploadImages}
            />
            <form onSubmit={submitForm}>
                <br />
                <br />
                <label>Title</label>
                <Input 
                name="title"
                onChange={handleTextFieldChange}
                value={title}
                />
                <br />
                <br />
                <br />
                <br />
                <label>Description</label>
                <TextArea 
                name="description"
                onChange={handleTextFieldChange}
                value={description}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input 
                name="price"
                onChange={handleTextFieldChange}
                value={price}
                type="number"
                />
                <select onChange={onContinentChange}>
                    {continentList.map((el)=> {
                    return(
                    <option key={el.key} value={el.key} >{el.value}</option>
                    )
                    })}
                </select>
                <br />
                <br />
                <Button onClick={submitForm}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default UploadProductPage;
