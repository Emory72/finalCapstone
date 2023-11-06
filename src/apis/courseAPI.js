import fetcher from "./fetcher";

export const getCourses = async () => {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        MaNhom: "GP03",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCourseCat = async () => {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCourseByCat = async (categoryID) => {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {
      params: {
        MaNhom: "GP03",
        maDanhMuc: categoryID,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCourseDetails = async (courseID) => {
  try {
    const response = await fetcher.get("/QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: {
        maKhoaHoc: courseID,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
