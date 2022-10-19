import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

interface LoadProps {
  item: DimentionLineState;
  setLoadDetailsRows: React.Dispatch<React.SetStateAction<any[]>>
 
}

const MaterialBox: React.FC<LoadProps> = ({ item, setLoadDetailsRows }) => {

  const handleDeleteLine = (e: any) => {
    setLoadDetailsRows(prev => (
      prev.filter((item) => item.id !== e.target.id)
    ));
  };

  const handleInputsChange = ( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => {
    const { name, value } = e.target;
    setLoadDetailsRows((prevState) => {
      const newState = [...prevState];
      const index = newState.findIndex((element) => element.id === item.id);
      newState[index] = {
        ...newState[index],
        [name]: value,
      };
      return newState;
    });
  
  };

  return (
    <Box className="box"
      sx={{ "& > :not(style)": { m: 1 }, display: "flex", alignItems: "center" }}
    >
      <Input name="loadpcs" type="number" placeholder="PCS"
        value={item.loadpcs} onChange={handleInputsChange}
      />
      <Input name="loadLength" placeholder="Length"
         value={item.loadLength} onChange={handleInputsChange}
      />
      <Input name="loadWidth" placeholder="Width" 
        value={item.loadWidth} onChange={handleInputsChange}
      />
      <Input name="loadHeight" placeholder="Height"
        value={item.loadHeight} onChange={handleInputsChange}
      />
      <button type="button" className="delete" id={item.id} onClick={handleDeleteLine}>
        Delete
      </button>
    </Box>
  );
};

export default MaterialBox;
