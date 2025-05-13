import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { PlusIcon, PencilIcon, TrashIcon, KeyIcon } from '@heroicons/react/24/outline';

const UserManagement = () => {
  // Function to generate a random password
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 9; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };
  
  // Mock user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastLogin: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Sales', lastLogin: new Date(Date.now() - 86400000) },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Inventory', lastLogin: new Date(Date.now() - 172800000) },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Sales', lastLogin: new Date(Date.now() - 259200000) },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Inventory', lastLogin: new Date(Date.now() - 345600000) },
    { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Admin', lastLogin: new Date(Date.now() - 432000000) },
    { id: 7, name: 'Robert Wilson', email: 'robert@example.com', role: 'Sales', lastLogin: new Date(Date.now() - 518400000) },
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Sales',
    password: ''
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Open add user modal
  const openAddModal = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Sales',
      password: generateRandomPassword()
    });
    setIsAddModalOpen(true);
  };
  
  // Open edit user modal
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: ''
    });
    setIsEditModalOpen(true);
  };
  
  // Open delete user modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };
  
  // Close all modals
  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };
  
  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      lastLogin: new Date()
    };
    setUsers([...users, newUser]);
    closeModals();
  };
  
  // Update existing user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          role: formData.role
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    closeModals();
  };
  
  // Delete user
  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    closeModals();
  };
  
  // Get role badge color
  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Sales': return 'bg-green-100 text-green-800';
      case 'Inventory': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout
      title="User"
      description="Add, update, and delete system users"
    >
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>
      
      {/* User List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                          {user.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(user.role)} py-1`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <PencilIcon className="h-5 w-5 inline" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(user)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddUser}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New User</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="John Doe"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="john@example.com"
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleInputChange}
                              required
                              className="focus:ring-blue-500 focus:border-blue-500 flex-grow block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md py-2 px-3"
                            />
                            <button
                              type="button"
                              onClick={() => setFormData({...formData, password: generateRandomPassword()})}
                              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-500 rounded-r-md hover:bg-gray-100"
                            >
                              <KeyIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">Generated password: {formData.password}</p>
                        </div>
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                          <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Sales">Sales</option>
                            <option value="Inventory">Inventory</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add User
                  </button>
                  <button
                    type="button"
                    onClick={closeModals}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUpdateUser}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit User</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            name="name"
                            id="edit-name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-email" className="block text-sm font-medium text-gray-700">Email</label>
                          <input
                            type="email"
                            name="email"
                            id="edit-email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-password" className="block text-sm font-medium text-gray-700">New Password (leave blank to keep current)</label>
                          <input
                            type="password"
                            name="password"
                            id="edit-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-3"
                          />
                        </div>
                        <div>
                          <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700">Role</label>
                          <select
                            id="edit-role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="mt-1 block w-full py-2.5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Sales">Sales</option>
                            <option value="Inventory">Inventory</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Update User
                  </button>
                  <button
                    type="button"
                    onClick={closeModals}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete User Modal */}
      {isDeleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Delete User</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={closeModals}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserManagement;
