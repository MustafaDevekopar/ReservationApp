import * as Yup from "yup"
import { useAuth } from "../Context/useAuth";
import { useForm } from "react-hook-form";
import {yupResolver } from "@hookform/resolvers/yup"
import ButtonComponent from "../Components/FormElements/ButtonComponent";
import { Link } from "react-router-dom";

type Props = {}
type registerFormsInputs = {
    email: string;
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("يرجى ادخال الايميل"),
    userName: Yup.string().required("يرجى ادخال اسم المستخدم"),
    password: Yup.string().required("يرجى ادخال كلمة المرور"),
})

const RegisterPage = (props: Props) => {
    const { registerUser } = useAuth();
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm<registerFormsInputs>({resolver: yupResolver(validation)});

    const handleLogin = (form: registerFormsInputs) => {
        registerUser(form.email ,form.userName, form.password);
    };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mb-20 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              تسجيل الدخول
            </h1>
            <form className="space-y-4 md:space-y-6" 
                onSubmit={handleSubmit(handleLogin)}
                >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
                  الايميل 
                </label>
                <input
                  type="text"
                  id="email"
                  className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                  placeholder="الايميل"
                  {...register("email")}
                />
                {errors.email ? <p>{errors.email.message}</p> : ""}
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border-2 border-LightXlGray rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-Darkgreen"
                  placeholder="اسم المستخدم"
                  {...register("userName")}
                />
                {errors.userName ? <p>{errors.userName.message}</p> : ""}
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
                {errors.password ? <p>{errors.password.message}</p> : ""}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      قم بتذكيري
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  نسيت كلمة المرور
                </a>
              </div>
              {/* <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                تسجيل دخول
              </button> */}
                <ButtonComponent 
                    text='تسجيل دخول'
                    type='submit'
                    onClick={() => console.log("")} 
                />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                 انا املك حساب?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                   تسجيل دخول
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegisterPage