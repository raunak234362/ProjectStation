/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Input, CustomSelect, Button, Toggle } from "../../../../index";
import { addProject } from "../../../../../store/projectSlice";
import Service from "../../../../../config/Service";
import { toast } from "react-toastify";
// import { Option } from '@material-tailwind/react'
const AddProject = () => {
  const projectData = useSelector((state) => state.projectData?.projectData);
  const fabricatorData = useSelector(
    (state) => state.fabricatorData?.fabricatorData
  );
  const departmentData = useSelector(
    (state) => state.userData?.departmentData?.data
  );


  const userData = useSelector((state) => state.userData?.staffData);
  // console.log(userData);
  const teams = useSelector((state) => state?.userData?.teamData?.data);
  
  const managerOption=userData?.filter((user)=>user.is_manager)?.map((user)=>{
    return{
      label:`${user.f_name} ${user.l_name}`,
      value:user.id
    }
  })


  const dispatch = useDispatch();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("DATA-----------------------",data);
    try {
      const response = await Service.addProject(data);
      toast.success("Project Added Successfully");
      dispatch(addProject(response.data));
      console.log(response);
    } catch (error) {
      toast.error("Error Adding Project");
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Fabricator Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <CustomSelect
                label="Fabricator"
                placeholder="Fabricator"
                size="lg"
                color="blue"
                options={fabricatorData?.map((fabricator) => ({
                  label: fabricator.fabName,
                  value: fabricator.id,
                }))}
                {...register("fabricator", {
                  required: "Fabricator is required",
                })}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Project Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-1">
              <Input
                label="Project Name:"
                placeholder="Project Name"
                size="lg"
                color="blue"
                {...register("name", { required: true })}
              />
              {errors.name && <div>This field is required</div>}
            </div>
            <div className="w-full my-2">
              <Input
                type="textarea"
                label="Description:"
                placeholder="Description"
                size="lg"
                color="blue"
                {...register("description", { required: true })}
              />
              {errors.description && <div>This field is required</div>}
            </div>
            <div className="w-full">
              <Input
                type="number"
                label="Estimated Hours"
                placeholder="HH"
                size="lg"
                color="blue"
                min="0"
                {...register("estimatedHours", { required: true })}
              />
              {errors.estimatedHours && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Project Stage & Status:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <CustomSelect
                label="Status"
                color="blue"
                name="status"
                options={[
                  { label: "Select Status", value: "" },
                  { label: "ASSIGNED", value: "ASSIGNED" },
                  { label: "ACTIVE", value: "ACTIVE" },
                  { label: "ONHOLD", value: "ON-HOLD" },
                  { label: "INACTIVE", value: "INACTIVE" },
                  { label: "DELAY", value: "DELAY" },
                  { label: "COMPLETE", value: "COMPLETE" },
                ]}
                {...register("status")}
                onChange={setValue}
              />
              {errors.status && <div>This field is required</div>}
            </div>

            <div className="w-full my-3">
              <CustomSelect
                label="Stage"
                name="stage"
                color="blue"
                options={[
                  { label: "Select Stage", value: "" },
                  { label: "(RFI)Request for Information", value: "RFI" },
                  { label: "(IFA)Issue for Approval", value: "IFA" },
                  { label: "(BFA)Back from Approval", value: "BFA" },
                  {
                    label: "(BFA-M)Back from Approval - Markup",
                    value: "BFA-M",
                  },
                  { label: "(RIFA)Re-issue for Approval", value: "RIFA" },
                  { label: "(RBFA)Return Back from Approval", value: "RBFA" },
                  { label: "(IFC)Issue for Construction", value: "IFC" },
                  { label: "(BFC)Back from Construction", value: "BFC" },
                  { label: "(RIFC)Re-issue for Construction", value: "RIFC" },
                  { label: "(REV)Revision", value: "REV" },
                  { label: "(CO#)Change Order", value: "CO#" },
                ]}
                {...register("stage")}
                onChange={setValue}
              />
              {errors.stage && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Department Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <CustomSelect
                label="Department"
                placeholder="Department"
                size="lg"
                color="blue"
                options={departmentData?.map((department) => ({
                  label: department.name,
                  value: department.id,
                }))}
                {...register("department", { required: true })}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
            <div className="w-full my-3">
              <CustomSelect
                label="Manager"
                placeholder="Manager"
                size="lg"
                color="blue"
                options={[
                  { label: "Select Manager", value: "" },
                  ...managerOption,
                ]}
                {...register("manager", { required: true })}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Team Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <CustomSelect
                label="Team"
                placeholder="Team"
                size="lg"
                color="blue"
                options={teams?.map((team) => ({
                  label: team.name,
                  value: team.id,
                }))}
                {...register("team")}
                onChange={setValue}
              />
              {errors.fabricator && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Additional Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <CustomSelect
                label="Tools:"
                color="blue"
                name="tool"
                options={[
                  { label: "Select Tools", value: "" },
                  { label: "TEKLA", value: "TEKLA" },
                  { label: "SDS2", value: "SDS2" },
                  { label: "PEMB", value: "PEMB" },
                ]}
                className="w-full"
                {...register("tools")}
                onChange={setValue}
              />
              {errors.tool && <div>This field is required</div>}
            </div>
            <div>
              <div className="text-sm w-full font-bold my-2 text-gray-800">
                Connection Design:
              </div>
              <div className="grid md:grid-cols-3 bg-white px-5 md:w-full md:justify-center rounded-xl">
                <div className="">
                  <Toggle
                    label="Main Design"
                    name="connectionDesign"
                    {...register("connectionDesign")}
                  />
                </div>
                <div className="">
                  <Toggle
                    label="Misc Design"
                    name="miscDesign"
                    {...register("miscDesign")}
                  />
                </div>
                <div className="">
                  <Toggle
                    label="Customer Design"
                    name="customer"
                    {...register("customer")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Important Dates:
          </div>
          <div className="mt-5 md:w-1/2 md:px-2 px-1 flex md:flex-row flex-col gap-5">
            <div className="w-full">
              <Input
                type="date"
                label="Start Date:"
                placeholder="Start Date"
                size="lg"
                color="blue"
                {...register("start_date", { required: true })}
              />
              {errors.start_date && <div>This field is required</div>}
            </div>
            <div className="w-full">
              <Input
                type="date"
                label="End Date:"
                placeholder="End Date"
                size="lg"
                color="blue"
                {...register("end_date", { required: true })}
              />
              {errors.end_date && <div>This field is required</div>}
            </div>
          </div>
          <div className="my-5 w-full">
            <Button type="submit">Add Project</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
