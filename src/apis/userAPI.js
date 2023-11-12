import fetcher from "./fetcher";

export const signin = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const userInfo = async () => {
  try {
    const response = await fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
