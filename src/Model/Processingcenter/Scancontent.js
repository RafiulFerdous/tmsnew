import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import './sc.css'
function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.text}
        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => removeTodo(index)}>x</button>
        </div>
      </div>
    );
  }
  
  function TodoForm({ addTodo }) {
    const [value, setValue] = React.useState("");
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  }
const Scancontent = () =>{
    const [data, setData] = React.useState("");
    const classes = useStyles();
    const qrRef = useRef(null);
    
    const [todos, setTodos] = React.useState([
       
      ]);
    
      const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
      };
    
      const completeTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
      };
    
      const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
      };
    {/*const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');



  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }*/}

    return(
        
        <div className="container">
            {/*
                            <Container className={classes.conatiner}>
                                <Card>
                                    <h2 className={classes.title}>Generate Download & Scan QR Code</h2>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                                <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                                                <Button className={classes.btn} variant="contained" 
                                                    color="primary" onClick={() => generateQrCode()}>Generate</Button>
                                                    <br/>
                                                    <br/>
                                                    <br/>
                                                    {imageUrl ? (
                                                    <a href={imageUrl} download>
                                                        <img src={imageUrl} alt="img"/>
                                                    </a>) : null}
                                                    </Grid>
                                                    <Grid item xl={3} lg={3} md={4} sm={10} xs={10}>
                                                        <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                                                        <QrReader
                                                        ref={qrRef}
                                                        delay={300}
                                                        style={{width: '100%'}}
                                                        onError={handleErrorFile}
                                                        onScan={handleScanFile}
                                                        legacyMode
                                                        />
                                                          
                                                        <h6>Scanned Code: {scanResultFile}</h6>
                                                    </Grid>
                                                    <Grid item xl={3} lg={3} md={4} sm={10} xs={10}>
                                                        <h4>Qr Code Scan by Web Cam</h4>
                                                        <QrReader
                                                        delay={300}
                                                        style={{width: '100%'}}
                                                        onError={handleErrorWebCam}
                                                        onScan={handleScanWebCam}
                                                        />
                                                        <h6>Scanned By WebCam Code: {scanResultWebCam}</h6>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                                    </Container>*/}
                      <div className={classes.conatiner}>
                                <div>
                                    <h2 className={classes.title}> Scan By Webcam</h2>
                                    <div>
                                        <div container spacing={2}>
                                                    <div className="barcode">
                                                        <h4>Bar Code Scan by Web Cam</h4>
                                                        <BarcodeScannerComponent
                                                            width={250}
                                                            height={250}
                                                            onUpdate={(err, result) => {
                                                            if (result) setData(result.text);
                                                            else setData("");
                                                            }}
                                                        />
                                                         
                                               
                                                        <h6>Scanned By WebCam Code: {data}</h6>
                                                    </div>
                                                        <div>
                                                          <table className="table table-hover">
                                                              <thead className="bg-dark">
                                                                  <tr className="text-white">
                                                                
                                                                      
                                                                      <th className=" d-flex mx-auto">Scan Product</th>
                                                      
                                                                  </tr>
                                                              </thead>

                                                              <tbody>
                                                                      <tr>
                                                                          <td className="d-flex mx-auto">{data}</td>
                                                                      </tr>
                                                              </tbody>
                                                          </table>
                                                      </div>
                                                </div>
                                            </div>
                                        </div>
                                  <div>
                                    <h2 className={classes.title}> Scan By Scanner</h2>
                                    <div>
                                        <div container spacing={2}>
                                              <div className="ap">
                                                  <div className="todo-list">
                                                      <TodoForm addTodo={addTodo} />
                                                          {todos.map((todo, index) => (
                                                          <Todo
                                                              key={index}
                                                              index={index}
                                                              todo={todo}
                                                              completeTodo={completeTodo}
                                                              removeTodo={removeTodo}
                                                          />
                                                          ))}
                                                  
                                                      </div>
                                                    </div>   
                                                </div>
                                            </div>
                                      </div>
                                          
                             </div>      
                        </div>

    )
};
const useStyles = makeStyles((theme) => ({
    conatiner: {
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: 'black',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default Scancontent ;