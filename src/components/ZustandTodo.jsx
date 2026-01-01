import { useEffect, useState } from "react";
import { useUsersStore } from "../zustand/usersStore";
import { Card, Input, Button } from "antd";

function ZustandUsers() {
  const { users, fetchUsers, deleteUser, editUser } = useUsersStore();
  const [editId, setEditId] = useState(null);
  const [editUserData, setEditUserData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (field, value) => {
    setEditUserData(prev => ({ ...prev, [field]: value }));
  };

  return (
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
          style={{ width: 300 }}
          actions={[
            editId === user.id ? (
              <Button type="primary" onClick={() => {
                editUser(editUserData.id, editUserData);
                setEditId(null);
              }}>Сохранить</Button>
            ) : (
              <Button onClick={() => { setEditId(user.id); setEditUserData(user); }}>Изменить</Button>
            ),
            <Button danger onClick={() => deleteUser(user.id)}>Удалить</Button>
          ]}
        >
          {editId === user.id ? (
            <>
              <Input
                value={editUserData.username}
                onChange={e => handleChange("username", e.target.value)}
                placeholder="Username"
                style={{ marginBottom: 5 }}
              />
              <Input
                value={editUserData.email}
                onChange={e => handleChange("email", e.target.value)}
                placeholder="Email"
                style={{ marginBottom: 5 }}
              />
              <Input
                value={editUserData.phone}
                onChange={e => handleChange("phone", e.target.value)}
                placeholder="Phone"
                style={{ marginBottom: 5 }}
              />
              <Input
                value={editUserData.website}
                onChange={e => handleChange("website", e.target.value)}
                placeholder="Website"
                style={{ marginBottom: 5 }}
              />
              <Input
                value={editUserData.company?.name || ""}
                onChange={e => setEditUserData(prev => ({
                  ...prev,
                  company: { ...prev.company, name: e.target.value }
                }))}
                placeholder="Company"
                style={{ marginBottom: 5 }}
              />
              <Input
                value={editUserData.address?.street || ""}
                onChange={e => setEditUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value }
                }))}
                placeholder="Street"
                style={{ marginBottom: 5 }}
              />
              <Input
                value={editUserData.address?.city || ""}
                onChange={e => setEditUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value }
                }))}
                placeholder="City"
              />
            </>
          ) : (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Website:</strong> {user.website}</p>
              <p><strong>Company:</strong> {user.company?.name}</p>
              <p><strong>Address:</strong> {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}</p>
            </>
          )}
        </Card>
      ))}
    </div>
  );
}

export default ZustandUsers;
