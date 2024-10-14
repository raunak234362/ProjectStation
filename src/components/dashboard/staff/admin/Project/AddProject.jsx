/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select, Button, Toggle } from "../../../../index";
import { addProject } from "../../../../../store/projectSlice";
// import { Option } from '@material-tailwind/react'
const AddProject = () => {
  const projectData = useSelector((state) => state.projectData);
  const fabricatorData = useSelector(
    (state) => state.fabricatorData?.fabricatorData
  );
  console.log(fabricatorData);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const AddProject = (data) => {
    // console.log(data)
    dispatch(addProject(data));
    console.log(addProject(data));
  };

  return (
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(AddProject)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Fabricator Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <Select
                label="Fabricator"
                placeholder="Fabricator"
                size="lg"
                color="blue"
                options={fabricatorData.map((fabricator) => ({
                  label: fabricator.name,
                  value: fabricator.id,
                }))}
                {...register("fabricator", { required: true })}
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
              <Select
                label="Status"
                color="blue"
                name="status"
                options={[
                  { label: "Select Status", value: "" },
                  { label: "ACTIVE", value: "ACTIVE" },
                  { label: "ON-HOLD", value: "ON-HOLD" },
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
              <Select
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
              <Input
                label="Department:"
                placeholder="Department"
                size="lg"
                color="blue"
                {...register("department", { required: true })}
              />
              {errors.department && <div>This field is required</div>}
            </div>
            <div className="w-full my-3">
              <Input
                label="Manager:"
                placeholder="Manager"
                size="lg"
                color="blue"
                {...register("manager", { required: true })}
              />
              {errors.manager && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Team Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <Input
                label="Team:"
                placeholder="Team"
                size="lg"
                color="blue"
                {...register("team", { required: true })}
              />
              {errors.team && <div>This field is required</div>}
            </div>
          </div>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Additional Information:
          </div>
          <div className="my-2 md:px-2 px-1">
            <div className="w-full my-3">
              <Select
                label="Tools:"
                color="blue"
                name="tool"
                options={[
                  { label: "Select Tools", value: "" },
                  { label: "TEKLA", value: "TEKLA" },
                  { label: "SDS-2", value: "SDS-2" },
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
            <Button type="submit" className="w-full">
              Add Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
