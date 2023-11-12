import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userInfo } from "../../apis/userAPI";
import { Link } from "react-router-dom";

export default function UserInfo() {
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: userInfo,
  });

  return (
    <section className="page-account ">
      <section className="inner-banner">
        <div className="container">
          <ul className="list-unstyled thm-breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">
              <a href="#">User Account</a>
            </li>
          </ul>
          <h2 className="inner-banner__title">User Details</h2>
        </div>
      </section>

      <section className="page-content py-5">
        <div
          className="container"
          style={{ display: "block", textAlign: "center" }}
        >
          <form
            className="w-100"
            style={{
              display: "inline-block",
              textAlign: "left",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label fw-bold">
                Account
              </label>
              <input
                type="text"
                class="form-control py-3"
                value={data?.taiKhoan}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label fw-bold">
                Username
              </label>
              <input
                type="text"
                class="form-control py-3"
                value={data?.hoTen}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label fw-bold">
                Email address
              </label>
              <input
                type="email"
                class="form-control py-3"
                value={data?.email}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                class="form-control py-3"
                value={data?.matKhau}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label fw-bold">
                User Type
              </label>
              <input
                type="text"
                class="form-control py-3"
                value={data?.maLoaiNguoiDung}
              />
            </div>

            <div class="mb-3 ">
              <label for="exampleInputPassword1" class="form-label fw-bold">
                Group
              </label>
              <input
                type="text"
                class="form-control py-3 "
                value={data?.maNhom}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label fw-bold">
                Phone Number
              </label>
              <input type="text" class="form-control py-3" value={data?.soDT} />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" class="btn btn-primary py-2">
              Submit
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
