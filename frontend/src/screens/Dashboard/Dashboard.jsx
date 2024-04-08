import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUsers } from "../../logic/redux/actions/userActions";
import DialogContentText from '@mui/material/DialogContentText';
import { editUser, deleteUser } from "../../logic/redux/actions/userActions";
import IconButton from '@mui/material/IconButton';
import { Edit as EditIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material';

function Dashboard() {

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        { field: "nombre", headerName: "Nombre", width: 150 },
        { field: "apellidoPaterno", headerName: "Apellido Paterno", width: 150 },
        { field: "apellidoMaterno", headerName: "Apellido Materno", width: 150 },
        { field: "correo", headerName: "Correo", width: 200 },
        { field: "numeroTelefonico", headerName: "Número Telefónico", width: 150 },
        {
            field: "role",
            headerName: "Rol",
            width: 100,
            valueGetter: (params) => params?.nombre ?? 'Sin Rol'
        },
        
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => handleOpenEdit(params.row)}
                        color="primary"
                        aria-label="edit"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleOpenDelete(params.row)}
                        color="primary"
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const dispatch = useDispatch();
    const userList = useSelector((state) => state.users.userList);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        correo: "",
        numeroTelefonico: "",
    });
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [esAdmin, setEsAdmin] = useState(false);

    useEffect(() => {
        const tokenString = localStorage.getItem('user');
        const tokenObj = JSON.parse(tokenString);
        const rol = tokenObj?.rol;
        setEsAdmin(rol === 1);
    }, []);

    const handleOpenEdit = (user) => {
        setCurrentUser(user);
        setEditFormData({
            id: user.id,
            nombre: user.nombre,
            apellidoPaterno: user.apellidoPaterno,
            apellidoMaterno: user.apellidoMaterno,
            correo: user.correo,
            numeroTelefonico: user.numeroTelefonico,
            password: user.password,
        });
        setOpenEdit(true);
    };
    
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setCurrentUser(null);
    };
    
    const handleOpenDelete = (user) => {
        setCurrentUser(user);
        setOpenDelete(true);
    };
    
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setCurrentUser(null);
    };
    
    const [editFormData, setEditFormData] = useState({
        id: null,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        numeroTelefonico: '',
        password: '',
    });

    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };
    
    const handleSaveEdit = () => {
        dispatch(editUser(editFormData.id, editFormData));
        handleCloseEdit();
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        console.log(userList);
        console.log(userList?.role?.nombre);
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreate = () => {
        dispatch(createUser(formData));
        handleClose();
    };

    return (
    <div className="p-4">
        {esAdmin && (
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Add User
            </Button>
        )}
        <div className="h-96 w-full mt-5 ">
            <DataGrid
                className="dark:text-white"
                rows={userList || []}
                columns={columns}
                pageSize={5}
                
                disableSelectionOnClick
                // filterModel={filterModel}
                slots={{ toolbar: GridToolbar }}
                // onFilterModelChange={(newModel) => setFilterModel(newModel)}
            />
        </div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Agregar nuevo usuario</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="nombre"
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.nombre}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                name="apellidoPaterno"
                label="Apellido Paterno"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.apellidoPaterno}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                name="apellidoMaterno"
                label="Apellido Materno"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.apellidoMaterno}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                name="correo"
                label="Correo"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.correo}
                onChange={handleChange}
                />
                <TextField
                margin="dense"
                name="numeroTelefonico"
                label="Numero Telefonico"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.numeroTelefonico}
                onChange={handleChange}
                />
                <TextField
                margin="dense"
                name="password"
                label="Contraseña"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="role-select-label">Rol</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        name="roleId"
                        value={formData.roleId}
                        label="Rol"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={2}>User</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    margin="dense"
                    name="fechaNacimiento"
                    label="Nacimiento"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    variant="outlined"
                    value={formData.fechaNacimiento}
                    onChange={handleChange} 
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
        
        <Dialog open={openEdit} onClose={handleCloseEdit}>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                name="nombre"
                label="Nombre"
                type="text"
                fullWidth
                variant="outlined"
                value={editFormData.nombre}
                onChange={handleEditFormChange}
                />
                <TextField
                margin="dense"
                name="apellidoPaterno"
                label="Apellido Paterno"
                type="text"
                fullWidth
                variant="outlined"
                value={editFormData.apellidoPaterno}
                onChange={handleEditFormChange}
                />
                <TextField
                margin="dense"
                name="apellidoMaterno"
                label="Apellido Materno"
                type="text"
                fullWidth
                variant="outlined"
                value={editFormData.apellidoMaterno}
                onChange={handleEditFormChange}
                />
                <TextField
                margin="dense"
                name="correo"
                label="Correo"
                type="email"
                fullWidth
                variant="outlined"
                value={editFormData.correo}
                onChange={handleEditFormChange}
                />
                <TextField
                margin="dense"
                name="numeroTelefonico"
                label="Numero Telefonico"
                type="number"
                fullWidth
                variant="outlined"
                value={editFormData.numeroTelefonico}
                onChange={handleEditFormChange}
                />
                <TextField
                margin="dense"
                name="password"
                label="Contraseña"
                type="text"
                fullWidth
                variant="outlined"
                // value={editFormData.password}
                onChange={handleEditFormChange}
                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit}>Cancelar</Button>
                <Button onClick={handleSaveEdit}>Guardar</Button>
            </DialogActions>
            </Dialog>
            
            <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Eliminar Usuario</DialogTitle>
            <DialogContent>
                <DialogContentText>
                ¿Estás seguro de que quieres eliminar a {currentUser?.nombre}? {currentUser?.apellidoPaterno}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDelete}>Cancelar</Button>
                <Button onClick={() => {
                dispatch(deleteUser(currentUser.id));
                handleCloseDelete();
                }} color="secondary">
                Eliminar
                </Button>
            </DialogActions>
            </Dialog>


        </div>
    );
}

export default Dashboard;
