
import * as Yup from "yup";
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonComponent from "../Components/FormElements/ButtonComponent";

type Props = {};
type registerFormsInputs = {
    phoneNumber: string;
    userName: string;
    password: string;
    accountType: string;
};

const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("يرجى ادخال رقم الهاتف"),
    userName: Yup.string().required("يرجى ادخال اسم المستخدم"),
    password: Yup.string().required("يرجى ادخال كلمة المرور"),
    accountType: Yup.string().required("يرجى اختيار نوع الحساب"),
});

const AddNewAdminPage = (props: Props) => {
    const { registerAdmin } = useAuth();
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm<registerFormsInputs>({resolver: yupResolver(validationSchema)});

    const handleRegister = (form: registerFormsInputs) => {
        registerAdmin(form.phoneNumber, form.userName, form.password, form.accountType);
    };

    return (
        <section className="bg-white rounded">
            <div className="flex flex-col items-center justify-center px-6 mx-auto py-0">
                <div className="w-full xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl ">
                             اضافة مشرف
                        </h3>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleRegister)}>
                            <div className="flex gap-2">
                                <span className="w-[50%]">
                                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">
                                        رقم الهاتف
                                    </label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                                        placeholder="رقم الهاتف"
                                        {...register("phoneNumber")}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
                                </span>
                                <span className="w-[50%]">
                                    <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900">
                                        اسم المستخدم
                                    </label>
                                    <input
                                        type="text"
                                        id="userName"
                                        className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                                        placeholder="اسم المستخدم"
                                        {...register("userName")}
                                    />
                                    {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName.message}</p>}
                                </span>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    كلمة المرور
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="accountType" className="block mb-2 text-sm font-medium text-gray-900">
                                    نوع الحساب
                                </label>
                                <select
                                    id="accountType"
                                    className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                                    {...register("accountType")}
                                >
                                    <option value="">يرجى اختيار نوع المشرف</option>
                                    <option value="Admin">مشرف</option>
                                    <option value="MainAdmin">مشرف رئيسي</option>
                                </select>
                                {errors.accountType && <p className="text-red-500 text-xs italic">{errors.accountType.message}</p>}
                            </div>
                            <ButtonComponent 
                                text='انشاء حساب'
                                type='submit'
                                onClick={() => console.log("")} 
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddNewAdminPage;
