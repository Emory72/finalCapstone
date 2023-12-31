import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { number, object, string } from "yup";
import { signup } from "../../../../apis/userAPI";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const signupSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu có ít nhât 8 ký tự , 1 ký tự Hoa, 1 ký tự thường và 1 số "
    ),
  email: string()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  hoTen: string().required("Họ và tên không được để trống"),
  soDt: number().required("Số điện thoại không được để trống và là số"),
});

export default function SignUp() {
  // register giúp Form tự động cập nhật giá trị input bị thay đổi
  // handleSubmit  như nhấn button submit form
  const {
    register,
    handleSubmit,
    //giup hien thi errors ra giao dien khi gia tri not valid
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      hoTen: "",
      soDt: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "onTouched",
  });

  const {
    // Dùng isLoading để disable button click sign up liên tục, tránh call API nhiều lần
    mutate: handleSignup,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {
      navigate("/sign-in");
    },
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    //Sau khi done validation trong onSubmit thi2 goi API dang ky
    handleSignup(values);
    //Điều hướng sang trang đăng nhập (/sign-in)
  };

  return (
    <section className="signup">
      <div className="container">
        <div className="center">
          <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
          <h4 className="h4">Đăng Ký</h4>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                className="input"
                placeholder="Tài Khoản "
                {...register("taiKhoan")}
              />
              {errors.taiKhoan && (
                <p className="text-danger">{errors.taiKhoan.message}</p>
              )}
            </div>
            <div>
              <input
                className="input"
                type="password"
                placeholder="Mật Khẩu"
                {...register("matKhau")}
              />
              {errors.matKhau && (
                <p className="text-danger">{errors.matKhau.message}</p>
              )}
            </div>
            <div>
              <input
                className="input"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                className="input"
                placeholder="Họ tên "
                {...register("hoTen")}
              />
              {errors.hoTen && (
                <p className="text-danger">{errors.hoTen.message}</p>
              )}
            </div>
            <div>
              <input
                className="input"
                placeholder="Số Điện Thoại "
                {...register("soDt")}
              />
              {errors.soDt && (
                <p className="text-danger">{errors.soDt.message}</p>
              )}
            </div>

            <button className="button" type="submit" disabled={isLoading}>
              Đăng Ký
            </button>
            {/* Error này là mutation là server trả về, errors ở trên là lỗi validation cua input  */}
            {error && <p>{error}</p>}
          </form>
          <div>
            <a className="backtoSign" href="/sign-in">
              Bạn đã có tài khoản? Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
