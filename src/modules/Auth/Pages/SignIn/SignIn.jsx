import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { object, string } from "yup";
import { Navigate, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../../../contexts/UserContext/UserContext";
import { signin } from "../../../../apis/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const signinSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu có ít nhât 8 ký tự , 1 ký tự Hoa, 1 ký tự thường và 1 số "
    ),
});
export default function SignIn() {
  const { currentUser, handleSignin: onSigninSuccess } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(signinSchema),
    mode: "onTouched",
    // Mặc định là onSubmit(sau khi submit mới show lỗi ), thay đồi thành onTouched để khi user bỏ qua 1 input thì show error liền
  });

  const {
    mutate: handleSignin,
    isLoading,
    error,
  } = useMutation({
    mutationFn: (payload) => signin(payload),
    onSuccess: (data) => {
      console.log(data);
      onSigninSuccess(data);
    },
  });

  const onSubmit = (values) => {
    handleSignin(values);
  };

  // import Navigate, khác biêt của useNavigate và Navigate:
  // useNavigate là một hook của React Router giúp tạo ra một hàm để chuyển hướng đến các route khác trong ứng dụng React
  //Navigate là một(component) để tự động chuyển hướng

  // loginUser khác null => user đã đăng nhập => điều hướng về home
  //Thêm replace để thay thế lịch sử định hướng tới các page khi đã sign in
  const [searchParams] = useSearchParams();

  if (currentUser) {
    const redirectTo = searchParams.get("redirectTo");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  const handleBackToSignup = () => {
    return <Navigate to="/sign-up" />;
  };

  return (
    <section className="signin">
      <div className="container">
        <div className="center">
          <FontAwesomeIcon className="userIcon" icon={faCircleUser} />
          <h4 className="h4">Đăng Nhập</h4>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                autoComplete="username"
                className="input"
                placeholder="Tài Khoản*"
                {...register("taiKhoan")}
              />
              {errors.taiKhoan && (
                <p className="text-danger">{errors.taiKhoan.message}</p>
              )}
            </div>

            <div>
              <input
                className="input"
                autoComplete="current-password"
                type="password"
                placeholder="Mật Khẩu*"
                {...register("matKhau")}
              />
              {errors.matKhau && (
                <p className="text-danger">{errors.matKhau.message}</p>
              )}
            </div>

            <button className="button" type="submit" disabled={isLoading}>
              Đăng Nhập{" "}
            </button>
            {error && <p className="text-danger">{error}</p>}
          </form>
          <div>
            <a className="backtoSign" href="/sign-up">
              Bạn chưa có tài khoản? Đăng ký
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
