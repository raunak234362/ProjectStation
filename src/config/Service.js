import api from "./api";
const token = sessionStorage.getItem("token");
class Service {
  // BASE_URL is stored as a constant

  // Fetch the logged-in user - updated
  static async getCurrentUser(token) {
    try {
      const response = await api.post(`/api/auth/getuserbytoken`, {
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

  static async getRecipients() {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(`/api/employee/employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("Error fetching recipients:", error);
      throw error;
    }
  }
  // Add a new employee (staff) -- updated
  static async addEmployee(updatedData) {
    try {
      const formData = { ...updatedData };
      const response = await api.post(`/api/employee/employee`, formData, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding staff:", error.response?.data || error);
      throw error;
    }
  }

  //Edit Employee
  static async editEmployee(employeeID, updatedData) {
    const token = sessionStorage.getItem("token");
    try {
      const formData = { ...updatedData };
      const response = await api.patch(
        `/api/employee/employee/${employeeID}`,
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error editing staff:", error.response?.data || error);
      throw error;
    }
  }

  static async editDepartment(departmentID, updatedData) {
    const token = sessionStorage.getItem("token");
    try {
      const formData = { ...updatedData };
      const response = await api.patch(
        `/api/department/department/${departmentID}`,
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error editing department:", error.response?.data || error);
      throw error;
    }
  }

  // Change password-updated -- updated
  static async changePassword(token, data) {
    try {
      const response = await api.post(`/api/auth/resetpassword/`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.log("Error changing password:", error);
      return error;
    }
  }

  // Fetch all employees (staff) -- updated
  static async allEmployee() {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(`/api/employee/employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error fetching employees:", error);
      throw error;
    }
  }

  // Fetch all departments -- updated
  static async allDepartment(token) {
    try {
      const response = await api.get(`/api/department/department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error fetching departments:", error);
      throw error;
    }
  }

  // Add new department -- updated
  static async addDepartment(data) {
    const token = sessionStorage.getItem("token");
    try {
      const departmentData = { ...data };

      const response = await api.post(
        `/api/department/department`,
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
    try {
      const token = sessionStorage.getItem("token");
      const formData = { ...fabricatorData };
      const response = await api.post(`/api/fabricator/fabricator/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      });

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
      const response = await api.post(
        `/api/fabricator/fabricator/${id}/addbranch/`,
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
  static async allFabricator() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/fabricator/fabricator`, {
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
  static async getFabricator(id) {
    console.log("Service:---", id);
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/fabricator/fabricator/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching fabricators:", error);
      throw error;
    }
  }

  // Edit Fabricator by ID -- updated
  static async editFabricator(id, data) {
    const formData = { ...data };
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.patch(
        `/api/fabricator/fabricator/${id}/updatefabricator`,
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error editing fabricator:", error);
      throw error;
    }
  }

  // Add Client user -- updated
  static async addClient(data) {
    try {
      const token = sessionStorage.getItem("token");
      const clientData = { ...data };
      console.log("clientData----", clientData);
      const response = await api.post(
        `/api/client/client/${data.fabricator}/addclient/`,
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

  // Fetch all Project File --updated
  static async addFabricatorFile(formData, id) {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.post(
        `/api/fabricator/fabricator/${id}/add_file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error uploading files:", error);
      throw error;
    }
  }

  // Fetch all clients -- updated
  static async allClient() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/client/client/getallclients`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await api.post(`/api/vendor/`, vendorData, {
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
      const response = await api.post(
        `/api/vendor/${data["vendor"]}/users/`,
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
      const response = await api.get(`/api/user/vendor/`, {
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
      const response = await api.get(`/api/vendor/`, {
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
    const token = sessionStorage.getItem("token");
    try {
      const formData = { ...projectData };
      const response = await api.post(`/api/project/projects`, formData, {
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
      const response = await api.get(`/api/project/projects`, {
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

  // Edit project by ID -- updated
  static async editProject(id, data) {
    console.log("Service:---", id);
    try {
      const response = await api.patch(`/api/project/projects/${id}`, data, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error editing project:", error);
      throw error;
    }
  }

  //delete project by ID -- updated
  static async deleteProject(id) {
    try {
      const response = await api.delete(`/api/project/projects/${id}`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error deleting project:", error);
      throw error;
    }
  }

  // Fetch all Project File --updated
  static async addProjectFile(formData, id) {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.post(
        `/api/project/projects/${id}/add_file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error uploading files:", error);
      throw error;
    }
  }

  // Fetch all Project File --updated
  static async allProjectFile(projectID, fileID) {
    console.log("projectID----", projectID);
    console.log("fileID----", fileID);
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(
        `/api/project/projects/viewfile/${projectID}/${fileID}`,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching projects:", error);
      throw error;
    }
  }

  // Add JobStudy
  static async addJobStudy(jobData) {
    const formData = { ...jobData };
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.post(`/api/br/addJobStudy`, formData, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding job study:", error);
      throw error;
    }
  }

  //All JobStudy
  static async allJobStudy(projectId) {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(`/api/br/getJobStudy/${projectId}`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error fetching all job studies:", error);
      throw error;
    }
  }

  static async allSubTasks(projectId, wbActivityId) {
    console.log("Service:---", projectId);
    console.log("Service:---", wbActivityId);
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(`/api/st/${projectId}/${wbActivityId}`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data?.data;
    } catch (error) {
      console.log("Error fetching all job studies:", error);
      throw error;
    }
  }

  //Add WorkBreakdown
  static async addWorkBreakdown(projectId, wbActivityId, workBreakdownData) {
    const formData = { ...workBreakdownData };
    console.log(formData);
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.post(
        `/api/st/add/${projectId}/${wbActivityId}`,
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error adding work breakdown:", error);
      throw error;
    }
  }
  //Add More Subtasks
  static async addOneSubTask(projectId, wbActivityId, workBreakdownData) {
    const formData = { ...workBreakdownData };
    console.log(formData);
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.post(
        `/api/st/oneSubtask/${projectId}/${wbActivityId}`,
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Error adding work breakdown:", error);
      throw error;
    }
  }

  // Add Teams -- updated
  static async addTeam(teamData) {
    try {
      const formData = { ...teamData };
      const response = await api.post(`/api/team/teams`, formData, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding team:", error);
      throw error;
    }
  }

  // Fetch all teams -- updated
  static async allteams() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/team/teams`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching teams:", error);
      throw error;
    }
  }

  // Fetch team by ID -- updated
  static async getTeamById(teamId) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/team/teams/${teamId}`, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.log("Error fetching team:", error);
      throw error;
    }
  }

  //
  static async addTeamMember(teamID, data) {
    console.log("Service:---", teamID);
    console.log("Service:---", data);
    const formData = { ...data };
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.patch(
        `/api/team/teams/${teamID}/addmember`,
        formData,
        {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error adding team member:", error);
      throw error;
    }
  }

  //RFI
  static async addRFI(rfiData) {
    console.log(rfiData);
    const data = new FormData();

    // Append files
    for (let i = 0; i < rfiData?.files.length; i++) {
      console.log("File:", rfiData?.files[i]);
      data.append("files", rfiData?.files[i]);
    }

    // Append other fields
    // Append other fields
    data.append("fabricator_id", rfiData?.fabricator_id);
    data.append("project_id", rfiData?.project_id);
    data.append("recipient_id", rfiData?.recipient_id);
    data.append("subject", rfiData?.subject);
    data.append("description", rfiData?.description);

    console.log("Data-------------", data);
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.post(`/api/rfi/rfi/addrfi`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding RFI:", error);
      throw error;
    }
  }

  static async inboxRFI() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/rfi/rfi/inbox`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching RFI:", error);
      throw error;
    }
  }

  static async sentRFI() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/rfi/rfi/sent`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching RFI:", error);
      throw error;
    }
  }

  //Fetch RFI by ID
  static async fetchRFIById(id) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/RFI/rfi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching RFI:", error);
      throw error;
    }
  }

  //Inbox RFQ
  static async inboxRFQ() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/RFQ/rfq/inbox`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching RFI:", error);
      throw error;
    }
  }
  //Sent RFQ
  static async sentRFQ() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/RFQ/rfq/sent`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.log("Error fetching RFI:", error);
      throw error;
    }
  }

  //Add RFQ

  static async addRFQ(RFQData) {
    const data = new FormData();

    // Append files
    for (let i = 0; i < RFQData?.files.length; i++) {
      console.log("File:", RFQData?.files[i]);
      data.append("files", RFQData?.files[i]);
    }

    // Append other fields
    // Append other fields

    data.append("projectName", RFQData?.projectName);
    data.append("recepient_id", RFQData?.recipient_id);
    data.append("subject", RFQData?.subject);
    data.append("description", RFQData?.description);
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.post(`/api/RFQ/rfq/addrfq`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching RFI:", error);
      throw error;
    }
  }

  // Submittals
  static async addSubmittal(submittals) {
    const data = new FormData();

    // Append files
    for (let i = 0; i < submittals?.files.length; i++) {
      console.log("File:", submittals?.files[i]);
      data.append("files", submittals?.files[i]);
    }

    // Append other fields
    data.append("fabricator_id", submittals?.fabricator_id);
    data.append("project_id", submittals?.project_id);
    data.append("recepient_id", submittals?.recepient_id);
    data.append("subject", submittals?.subject);
    data.append("description", submittals?.description);

    try {
      const token = sessionStorage.getItem("token");
      const response = await api.post(`/api/submittals/submittals`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding RFI:", error);
      throw error;
    }
  }

  // Fetch sent submittals
  static async sentSubmittal() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/submittals/submittals/sent`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding RFI:", error);
      throw error;
    }
  }

  // Fetch recivied Submittal
  static async reciviedSubmittal() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await api.get(`/api/submittals/submittals/recieved`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error adding RFI:", error);
      throw error;
    }
  }

  // Update Job Study
  static async updateJobStudy(jobStudyId, data) {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.patch(
        `/api/br/updateJobStudy/${jobStudyId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error updating job study:", error);
      throw error;
    }
  }

  //Fetch workBreakdown Activity
  static async fetchWorkBreakdownActivity(selectedTask, projectId) {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(
        `/api/wbs/wbs/${selectedTask}/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log("Error fetching work breakdown activity:", error);
    }
  }

  static async getAllTask() {
    const token = sessionStorage.getItem("token");
    try {
      const response = await api.get(`/api/task/tasks/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response?.data?.data;
    } catch (error) {
      console.log("Error in getting Task: ", error);
      throw error;
    }
  }

  // Ping server
  // static async ping() {
  //   try {
  //     const response = await Promise.race([
  //       axios.get(`/API/ping`, {
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
