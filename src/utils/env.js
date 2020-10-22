let baseUrl;

if (process.env.NODE_ENV === "development") {
  // baseUrl='http://192.168.0.125:8765/'  //测试后台 钟承铭
  // baseUrl = "http://192.168.0.235:8765/"; //测试后台 老王
  // baseUrl='http://192.168.0.169:8765/'  //测试后台 阿超
  baseUrl="http://119.97.150.23:8765/"
} else if (process.env.NODE_ENV === "production") {
  // baseUrl= window.location.origin
  baseUrl = "http://119.97.150.23:8765/";
}
export { baseUrl };
