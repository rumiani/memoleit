export interface initialStateTypes {
    local: {
      catagories:{},
      items:[]
    },
    item:{
      id: string,
      title: string,
      description:string,
      subject: string,
      createdAt: string,
      learned: boolean,
      days:number,
      shouldReview:boolean
    }
  };
