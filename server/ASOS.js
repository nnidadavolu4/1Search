async function ASOSCustomUrl(searchTerm,type,size){
    //Took out currentpricerange=5-410 since we get different
    //For plus size: /?currentpricerange=5-690&q=shirt
    let url = "https://www.asos.com/au/search/?q=" + searchTerm;
      switch(type){
        case "petite":
          url += "&refine=attribute_10155:6403"
          if(size != null){
            //size == 6 && size == 5 maybe??
            if(size<= 6){
              url += "|size:91";
            }  
            else if(size<= 8){
              url += "|size:103";
            }
            
            else if(size<= 10){
              url += "|size:19";
            }else if(size<= 12){
              url += "|size:31";
            }else{
              //Size > 12
              url += "|size:149,43,55,67" //What about 22...32?
            }
          }else{
            //size == null, select all petite, do nothing
          }
          break;
  
        case "plus":
          url += "&refine=attribute_10155:7699"
          if(size != null){
            if(size<= 16){
              url += "|size:55"
            }else if(size<= 18){
              url += "|size:67"
            }else if(size<= 20){
              url += "|size:149"
            }
            //if size != null but >20?
          }else{ //size == null
              //do nothing
          }
          break;

        case "maternity":
          url += "&refine=attribute_10155:6400";
          if(size != null){
            if(size<= 8){
              url += "|size:103"
            }else if(size<= 10){
              url += "|size:19"
            }else if(size<= 12){
              url += "|size:31"
            }else if(size<= 14){
              url += "|size:43"
            }else if(size<= 16){
              url += "|size:55"
            }else if(size<= 18){
              url += "|size:67"
            }else if(size<= 20){
              url += "|size:149"
            }else if(size> 20){ //size 24
              url += "|size:179,203"
            }}
          break;

        default:
          //size url are all the same, except take away the |
          url += "&refine=";
          if(size != null){
            if(size<= 8){
              url += "size:103"
            }else if(size<= 10){
              url += "size:19"
            }else if(size<= 12){
              url += "size:31"
            }else if(size<= 14){
              url += "size:43"
            }else if(size<= 16){
              url += "size:55"
            }else if(size<= 18){
              url += "size:67"
            }else if(size<= 20){
              url += "size:149"
            }

      }
  
  }
}

    