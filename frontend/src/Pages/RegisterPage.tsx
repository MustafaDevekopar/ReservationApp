
import * as Yup from "yup";
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonComponent from "../Components/FormElements/ButtonComponent";
import { Link } from "react-router-dom";

type Props = {};
type registerFormsInputs = {
    email: string;
    userName: string;
    password: string;
    accountType: string;
};

const validationSchema = Yup.object().shape({
    email: Yup.string().required("يرجى ادخال الايميل").email("يرجى ادخال ايميل صحيح"),
    userName: Yup.string().required("يرجى ادخال اسم المستخدم"),
    password: Yup.string().required("يرجى ادخال كلمة المرور"),
    accountType: Yup.string().required("يرجى اختيار نوع الحساب"),
});

const RegisterPage = (props: Props) => {
    const { registerUser } = useAuth();
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm<registerFormsInputs>({resolver: yupResolver(validationSchema)});

    const handleRegister = (form: registerFormsInputs) => {
        registerUser(form.email, form.userName, form.password, form.accountType);
    };

    return (
        <section className="bg-gray-50 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            انشاء حساب
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleRegister)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    الايميل
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                                    placeholder="الايميل"
                                    {...register("email")}
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                            </div>
                            <div>
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
                                    <option value="">يرجى اختيار نوع الحساب</option>
                                    <option value="User">مستخدم</option>
                                    <option value="FieldOwner">مالك ملعب</option>
                                </select>
                                {errors.accountType && <p className="text-red-500 text-xs italic">{errors.accountType.message}</p>}
                            </div>
                            <ButtonComponent 
                                text='انشاء حساب'
                                type='submit'
                                onClick={() => console.log("")} 
                            />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                هل لديك حساب بالفعل؟{" "}
                                <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    تسجيل الدخول
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
