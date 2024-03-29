import {
  LAUNDRY_GET_PRICE,
  LAUNDRY_GET_REQUEST_SUCCESS,
  LAUNDRY_REQUEST_CONFIRM,
  LAUNDRY_REQUEST_DELETE,
  LAUNDRY_REQUEST_SUCCESS,
  LAUNDRY_REQUEST_UPDATE,
  LAUNDRY_REQUEST_UPDATE_STATUS,
} from "./app_Type";

const initialState = {
  pendingRequest: 0,
  confirmRequest: 0,
  inprocessRequest: 0,
  finishRequest: 0,
  currentId: "",
  requests: [],
  price:{}
};

export const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LAUNDRY_REQUEST_SUCCESS: {
      state.requests.unshift(payload);
      return {
        ...state,
        pendingRequest: state.pendingRequest + 1,
        currentId: payload._id,
      };
    }
    case LAUNDRY_REQUEST_UPDATE: {
      const updatedRequests = state.requests.map(req => {
        if (req._id === payload._id) return payload;
        return req;
      })
      return {
        ...state,
        requests: updatedRequests
      };
    }
    case LAUNDRY_REQUEST_DELETE: {
      console.log("payload",payload)
      const filteredRequests = state.requests.filter(req => req._id != payload._id)
      console.log("filter",filteredRequests)
      return {
        ...state,
        requests: filteredRequests
      };
    }
    case LAUNDRY_GET_PRICE: {
      return {
        ...state,
        price:payload
      };
    }
    case LAUNDRY_GET_REQUEST_SUCCESS: {
      let pending = payload.filter((ele) => ele.status === "pending");
      let confirm = payload.filter((ele) => ele.status === "confirmed");
      return {
        ...state,
        requests: payload,
        pendingRequest: pending.length,
        confirmRequest: confirm.length,
      };
    }
    case LAUNDRY_REQUEST_CONFIRM: {
      let newArr = state.requests.map((ele) =>
        ele._id === payload._id ? payload : ele
      );
      return {
        ...state,
        requests: newArr,
        pendingRequest: state.pendingRequest - 1,
        confirmRequest: state.confirmRequest + 1,
        currentId: "",
      };
    }
    case LAUNDRY_REQUEST_UPDATE_STATUS: {
      const { requestId, status } = payload; // 'payload' should contain the requestId and status
      return {
        ...state,
        requests: state.requests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        ),
      };
    }
    default: {
      return { ...state };
    }
  }
};
