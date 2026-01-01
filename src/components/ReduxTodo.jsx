import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, editUser } from "../redux/usersSlice";
import { Card, Input, Button } from "antd";

function ReduxUsers() {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editUserData, setEditUserData] = useState({});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setEditUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setEditUserData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  return (
    <div>
      <h2>Redux Todo (Users)</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {users.map(user => (
          <Card
            key={user.id}
            title={editId === user.id ? (
              <Input
                value={editUserData.name}
                onChange={e => handleChange("name", e.target.value)}
              />
            ) : (
              `${user.name} (ID: ${user.id})`
            )}
            style={{ width: 350 }}
            actions={[
              editId === user.id ? (
                <Button type="primary" onClick={() => {
                  dispatch(editUser(editUserData));
                  setEditId(null);
                }}>Сохранить</Button>
              ) : (
                <Button onClick={() => { setEditId(user.id); setEditUserData(user); }}>Изменить</Button>
              ),
              <Button danger onClick={() => dispatch(deleteUser(user.id))}>Удалить</Button>
            ]}
          >
            {editId === user.id ? (
              <>
                <Input value={editUserData.username} onChange={e => handleChange("username", e.target.value)} placeholder="Username" style={{marginBottom:5}} />
                <Input value={editUserData.email} onChange={e => handleChange("email", e.target.value)} placeholder="Email" style={{marginBottom:5}} />
                <Input value={editUserData.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="Phone" style={{marginBottom:5}} />
                <Input value={editUserData.website} onChange={e => handleChange("website", e.target.value)} placeholder="Website" style={{marginBottom:5}} />
                <Input value={editUserData.company?.name || ""} onChange={e => handleNestedChange("company","name",e.target.value)} placeholder="Company Name" style={{marginBottom:5}} />
                <Input value={editUserData.company?.catchPhrase || ""} onChange={e => handleNestedChange("company","catchPhrase",e.target.value)} placeholder="CatchPhrase" style={{marginBottom:5}} />
                <Input value={editUserData.company?.bs || ""} onChange={e => handleNestedChange("company","bs",e.target.value)} placeholder="BS" style={{marginBottom:5}} />
                <Input value={editUserData.address?.street || ""} onChange={e => handleNestedChange("address","street",e.target.value)} placeholder="Street" style={{marginBottom:5}} />
                <Input value={editUserData.address?.suite || ""} onChange={e => handleNestedChange("address","suite",e.target.value)} placeholder="Suite" style={{marginBottom:5}} />
                <Input value={editUserData.address?.city || ""} onChange={e => handleNestedChange("address","city",e.target.value)} placeholder="City" style={{marginBottom:5}} />
                <Input value={editUserData.address?.zipcode || ""} onChange={e => handleNestedChange("address","zipcode",e.target.value)} placeholder="Zipcode" style={{marginBottom:5}} />
                <Input value={editUserData.address?.geo?.lat || ""} onChange={e => setEditUserData(prev=>({ ...prev, address:{ ...prev.address, geo:{ ...prev.address.geo, lat:e.target.value } } }))} placeholder="Lat" style={{marginBottom:5}} />
                <Input value={editUserData.address?.geo?.lng || ""} onChange={e => setEditUserData(prev=>({ ...prev, address:{ ...prev.address, geo:{ ...prev.address.geo, lng:e.target.value } } }))} placeholder="Lng" />
              </>
            ) : (
              <>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> {user.website}</p>
                <p><strong>Company:</strong> {user.company?.name} | {user.company?.catchPhrase} | {user.company?.bs}</p>
                <p><strong>Address:</strong> {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}</p>
                <p><strong>Geo:</strong> {user.address?.geo?.lat}, {user.address?.geo?.lng}</p>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReduxUsers;
