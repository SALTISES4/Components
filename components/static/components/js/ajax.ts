function getCsrfToken() {
  return (
    document.querySelectorAll(
      "input[name=csrfmiddlewaretoken]",
    )[0] as HTMLInputElement
  ).value;
}

async function handleResponse(response: Response) {
  // TODO: Add response.ok check?
  if (
    response.status == 200 || // OK
    response.status == 201 // CREATED
  ) {
    try {
      // Try to return json data
      const _response = response.clone();
      return await _response.json();
    } catch {
      // Try to return a file
      return await response.blob();
    }
  }

  if (response.status == 204) {
    // DELETED
    return Promise.resolve();
  }

  if (response.status == 403) {
    const data = await response.json();
    if (data["detail"] == "Authentication credentials were not provided.") {
      const base = new URL(window.location.protocol + window.location.host);
      const url = new URL("login/", base);
      url.search = `?next=${window.location.pathname}`;
      window.location.href = url.toString();
    } else {
      throw new Error(response.toString());
    }
  }

  if ([400, 404, 405].includes(response.status)) {
    throw await response.json();
  }

  // Default to error?
  throw new Error(response.toString());
}

const defaultSettings = {
  mode: "same-origin",
  cache: "no-cache",
  credentials: "same-origin",
  redirect: "follow",
  referrerPolicy: "same-origin",
};

export async function submitData(
  url: string,
  data: Record<string, unknown>,
  method: string,
): Promise<Record<string, unknown> | unknown[] | Error> {
  // Only attach csrf token to unsafe methods
  if (["POST", "PATCH", "PUT", "DELETE"].includes(method.toUpperCase())) {
    const settings = {
      method,
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
  return await get(url, method);
}

export async function submitFormData(
  url: string,
  formdata: FormData,
  method: string,
): Promise<Record<string, unknown> | unknown[] | Error> {
  // Only attach csrf token to unsafe methods
  if (["POST", "PATCH", "PUT", "DELETE"].includes(method.toUpperCase())) {
    const settings = {
      method,
      headers: new Headers({
        "X-CSRFToken": getCsrfToken(),
      }),
      body: formdata,
    };
    Object.assign(settings, defaultSettings);
    const response = await fetch(url, settings);
    return await handleResponse(response);
  }
  return await get(url, method);
}

export async function get(
  url: string,
  method = "GET",
): Promise<Record<string, unknown> | unknown[] | Error> {
  const settings = {
    method,
  };
  Object.assign(settings, defaultSettings);
  const response = await fetch(url, settings);
  return await handleResponse(response);
}
