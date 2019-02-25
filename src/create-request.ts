type RequestProgress = (value: number) => void;
type RequestSuccess<ResultType> = (result: ResultType) => void;
type RequestError = (error: Error) => void;

function createRequest<ResultType>(
  url: string,
  method: string,
  onSuccess: RequestSuccess<ResultType>,
  onError: RequestError,
  onProgress?: RequestProgress
) {
  const xhr = new XMLHttpRequest();

  xhr.onabort = () => onError(new Error());
  xhr.onerror = () => onError(new Error());
  xhr.ontimeout = () => onError(new Error());

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      return onSuccess(xhr.response);
    }

    return onError(new Error());
  };

  xhr.onprogress = evt => {
    if (onProgress && evt.lengthComputable) {
      onProgress((evt.loaded / evt.total) * 100);
    }
  };

  xhr.open(method, url, true);
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  return xhr;
}

export { createRequest };
