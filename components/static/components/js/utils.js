function getCsrfToken() {
  return document.querySelectorAll("input[name=csrfmiddlewaretoken]")[0].value;
}

async function handleResponse(response) {
  if (
    response.status == 200 || // OK
    response.status == 201 // CREATED
  ) {
    return await response.json();
  }

  // Default to error
  throw new Error(response);
}

const defaultSettings = {
  mode: "same-origin",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "error",
  referrerPolicy: "same-origin",
};

export async function post(url, data) {
  const settings = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "X-CSRFToken": getCsrfToken(),
    }),
    body: JSON.stringify(data),
  };
  Object.assign(settings, defaultSettings);
  const response = await fetch(url, settings);
  return await handleResponse(response);
}
