const initialState = {
  page: 'Explorer',
};

interface ActionProps {
  page: string;
  type: string;
}

export default function (state = initialState, action: ActionProps) {
  return {...state, page: action.page, type: 'pageUpdate'};
}
