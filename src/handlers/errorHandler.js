const errorHandler = (err, req, res, next) => {
  console.error(`[${err.statusCode || 500}] 서버 에러: ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "서버에서 오류가 발생했습니다.";


  switch (statusCode) {
      case 400:
          message = "Bad Request";
          break;
      case 401:
          message = "인증되지 않았습니다. 올바른 인증 정보를 제공해주세요.";
          break;
      case 403:
          message = "요청한 작업을 수행하기 위한 권한이 없습니다.";
          break;
      case 404:
          message = "서버에 문제가 발생했습니다. 잠시후 다시 시도해주세요.";
          break;
      case 405:
          message = "서버에 문제가 발생했습니다. 잠시후 다시 시도해주세요.";
          break;
      case 419:
          message = "인증이 만료되었습니다. 다시 로그인해주세요.";
          break;
      case 500:
          message = "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
          break;
      case 504:
          message = "외부 서비스(AWS)와 연결이 지연되었습니다. 잠시 후 다시 시도해주세요.";
          break;
  }

  res.status(statusCode).json({
      status: statusCode,
      message: message
  });
};

export default errorHandler;
