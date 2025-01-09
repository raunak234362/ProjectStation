import { useForm } from "react-hook-form";
import Service from "../../../../../config/Service";
import { Input, CustomSelect, Button } from "../../../../index";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "../../../../../store/userSlice";

const AddTeam = () => {

  const userData = useSelector((state) => state?.userData?.staffData?.data);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Service.addTeam(data);
      console.log(response);
      if (response.status === 200) {
        dispatch(addTeam(response?.data?.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return(
    <div className="flex w-full justify-center text-black my-5">
      <div className="h-full w-full overflow-y-auto md:px-10 px-2 py-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-teal-500/50 rounded-lg px-2 py-2 font-bold text-white">
            Department:
          </div>

          <div className="my-2 md:px-2 px-1">
            <div className="w-full">
              <Input
                label="Team Name:"
                placeholder="Team Name"
                size="lg"
                color="blue"
                {...register("name", { required: true })} // Registering department name
              />
              {errors.name && (
                <div className="text-red-500">This field is required</div>
              )}
            </div>

            <div className="w-full mt-4">
              <CustomSelect
                label="Manager:"
                color="blue"
                options={userData?.filter(user => user.is_manager).map((user) => ({label: user.f_name, value: user.id}))}
                {...register("manager")}
                onChange={setValue}
              />
              {errors.manager && (
                <div className="text-red-500">This field is required</div>
              )}
            </div>
          </div>

          <div className="my-5 w-full">
            <Button type="submit" className="w-full">
              Add Department
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeam;
