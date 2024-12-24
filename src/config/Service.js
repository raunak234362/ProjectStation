import axios from "axios";
import { BASE_URL } from "./constant";
const token = sessionStorage.getItem("token");
class Service {
  // BASE_URL is stored as a constant
  static BASE_URL = BASE_URL;

  // Fetch the logged-in user - updated
  static async getCurrentUser(token) {
    console.log(token);
    try {
      const response = await axios.post(`${BASE_URL}/auth/getuserbytoken`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error finding Current user:", error);
      throw error;
    }
  }

  // Add a new employee (staff) -- updated
  static async addEmployee(updatedData) {
    console.log(updatedData);
    try {
      const formData = { ...updatedData };
      const response = await axios.post(
        `${BASE_URL}/employee/employee`,
        formData,
        {
          headers: {
            "Content-Type": "Application/js on",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error adding staff:", error.response?.data || error);
      throw error;
    }
  }

  // Change password-updated -- updated
  static async changePassword(token, data) {
    console.log(data);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/resetpassword/`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("Error changing password:", error);
      return error;
    }
  }

  // Fetch all employees (staff) -- updated
  static async allEmployee(token) {
    try {
      const response = await axios.get(`${BASE_URL}/employee/employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching employees:", error);
      throw error;
    }
  }

  // Fetch all departments -- updated
  static async allDepartment(token) {
    try {
      const response = await axios.get(`${BASE_URL}/department/department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching departments:", error);
      throw error;
    }
  }

  // Add new department -- updated
  static async addDepartment(data) {
    try {
      const departmentData = { ...data };

      const response = await axios.post(
        `${BASE_URL}/department/department`,
        departmentData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error adding department:", error);
      throw error;
    }
  }

  // Add new fabricator -- updated
  static async addFabricator(fabricatorData) {
    console.log("Successfully Added Fabricator: ", fabricatorData);
    try {
      const formData = { ...fabricatorData };
      const response = await axios.post(
        `${BASE_URL}/fabricator/fabricator/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error in adding Fabricator: ", error);
      throw error;
    }
  }

  //Add Fabricator Branch -- updated
  static async addFabricatorBranch(fabricatorBranchData, id) {
    try {
      const formData = { ...fabricatorBranchData };
      const response = await axios.post(
        `${BASE_URL}/fabricator/fabricator/${id}/addbranch/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error in adding Fabricator Branch: ", error);
      throw error;
    }
  }

  // Fetch all fabricators -- updated
  static async allFabricator(token) {
    try {
      const response = await axios.get(`${BASE_URL}/fabricator/fabricator`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error fetching fabricators:", error);
      throw error;
    }
  }

  // Fetch Fabricator -- updated
  static async getFabricator(token, id) {
    console.log("Service:---", id);
    try {
      const response = await axios.get(
        `${BASE_URL}/fabricator/fabricator/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching fabricators:", error);
      throw error;
    }
  }

  // Add Client user -- updated
  static async addClient(data) {
    try {
      const clientData = { ...data };
      console.log(data);
      const response = await axios.post(
        `${BASE_URL}/client/client/${data.fabricator}/addclient/`,
        clientData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("Error adding client:", error);
      throw error;
    }
  }

  // Fetch all clients -- updated
  static async allClient(token) {
    try {
      const response = await axios.get(
        `${BASE_URL}/client/client/getallclients`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Error fetching clients:", error);
      throw error;
    }
  }

  // Add new vendor
  static async addVendor(data) {
    try {
      const vendorData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key]) vendorData.append(key, data[key]);
      });
      vendorData.append("role", "VENDOR");
      console.log(data);
      const response = await axios.post(`${BASE_URL}/vendor/`, vendorData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      return response;
    } catch (error) {
      console.log("Error adding vendor:", error);
      throw error;
    }
  }
  // Add new vendor user
  static async addVendorUser(data) {
    try {
      const vendorUserData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key]) vendorUserData.append(key, data[key]);
      });
      vendorUserData.append("role", "VENDOR");
      console.log(data);
      const response = await axios.post(
        `${BASE_URL}/vendor/${data["vendor"]}/users/`,
        vendorUserData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log("Error adding vendor:", error);
      throw error;
    }
  }

  // Fetch all vendor users
  static async allVendorUser(token) {
    try {
      const response = await axios.get(`${BASE_URL}/user/vendor/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching vendors:", error);
      throw error;
    }
  }
  // Fetch all Vendors
  static async allVendor(token) {
    try {
      const response = await axios.get(`${BASE_URL}/vendor/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching vendors:", error);
      throw error;
    }
  }

  //Add new project -- updated
  static async addProject(projectData) {
    try {
      const formData = { ...projectData };
      const response = await axios.post(`${BASE_URL}/project/projects`, formData, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data?.data;
    } catch (error) {
      console.log("Error adding project:", error);
      throw error;
    }
  }

  // Fetch all projects --updated
  static async allprojects(token) {
    try {
      const response = await axios.get(`${BASE_URL}/project/projects`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching projects:", error);
      throw error;
    }
  }

  // Ping server
  // static async ping() {
  //   try {
  //     const response = await Promise.race([
  //       axios.get(`${BASE_URL}/ping`, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         }}),
  //       new Promise((resolve, reject) => {
  //         setTimeout(() => reject(new Error('Timeout')), 10000);
  //       }),
  //     ]);
  //     return response.data.connection;
  //   } catch (error) {
  //     console.log('Error pinging server:', error);
  //     return false;
  //   }
  // }
}

export default Service;
