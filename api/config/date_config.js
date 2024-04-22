exports.getDate = function (str) {
  const [datePart, timePart] = str.split(" "); // Tách ngày và giờ
  const [day, month, year] = datePart.split("/").map(Number); // Chia ngày, tháng, năm
  const [hour, minute] = timePart.split("h").map(Number); // Chia giờ và phút

  // Tạo đối tượng Date từ các phần đã chia
  let date = new Date(year, month - 1, day, hour, minute);

  // Trừ sự chênh lệch múi giờ (7 * 60 * 60 * 1000 milliseconds) để chuyển đổi sang múi giờ GMT+7
  date = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  return date.toISOString();
};
