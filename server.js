const dotenv = require('dotenv');
dotenv.config()
const { Parser } = require('json2csv');
const request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'master.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'openings_status', title: 'openings_status'},
        {id: 'custom_employment_type', title: 'custom_employment_type'},
        {id: 'offices_id', title: 'offices_id'},
        {id: 'offices_name', title: 'offices_name'},
        {id: 'status', title: 'status'},
        {id: 'offices_location_name', title: 'offices_location_name'},
        {id: 'created_at', title: 'created_at'},
        {id: 'opened_at', title: 'opened_at'},
        {id: 'copied_from_id', title: 'copied_from_id'},
        {id: 'requisition_id', title: 'requisition_id'},
        {id: 'departments_id', title: 'departments_id'},
        {id: 'departments_name', title: 'departments_name'},
        {id: 'hiring_recruiters_id', title: 'hiring_recruiters_id'},
        {id: 'hiring_recruiters_name', title: 'hiring_recruiters_name'},
        {id: 'hiring_managers_id', title: 'hiring_managers_id'},
        {id: 'hiring_managers_name', title: 'hiring_managers_name'},
        {id: 'openings_id', title: 'openings_id'},
        {id: 'openings_close_id', title: 'openings_close_id'},
        {id: 'openings_close_name', title: 'openings_close_name'},
    ]
});
var options = {
    'method': 'GET',
    'url': process.env.URL,
    'headers': {
      'Accept': 'application/json',
      'Authorization': process.env.AUT
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
  //  console.log(response.body);  
    const myArr = JSON.parse(response.body); 
    //console.log(myArr);

    let records1 = [];
    let data;


    for (const product of myArr){
   const departments = product.departments[0];
   //const hiring_recruiters = product.hiring_team_recruiters[0];
   function get_id(departments){
      if (departments == null) {
        const departments_id = null;
        return departments_id;
        } else {
         const departments_id = departments.id;
        return departments_id;
      } 
   }
      function get_name(departments){
        if (departments == null) {
          const departments_name = null;
          return departments_name;
          } else {
           const departments_name = departments.name;
          return departments_name;
        } 
   }
   
   const hiring_managers = product.hiring_team.hiring_managers[0];
   function get_managerid(hiring_managers){
    if (hiring_managers == null) {
      const hiring_managers_id = null;
      return hiring_managers_id;
      } else {
       const hiring_managers_id = hiring_managers.id;
      return hiring_managers_id;
    }

   }
   function get_manager(hiring_managers){
    if (hiring_managers == null) {
      const hiring_managers_name = null;
      return hiring_managers_name;
      } else {
       const hiring_managers_name = hiring_managers.name;
      return hiring_managers_name;
    }

   }
   
   const hiring_recruiters = product.hiring_team.recruiters[0];
  // console.log(hiring_recruiters)
   function get_recruiter(hiring_recruiters){
    if (hiring_recruiters == null) {
      const hiring_recruiters_id = null;
      return hiring_recruiters_id;
      } else {
       const hiring_recruiters_id = hiring_recruiters.id;
      return hiring_recruiters_id;
    }

   }
   
   function get_recs(hiring_recruiters){
    if (hiring_recruiters == null) {
      const hiring_recruiters_name = null;
      return hiring_recruiters_name;
      } else {
       const hiring_recruiters_name = hiring_recruiters.name;
      return hiring_recruiters_name;
    }

   }
   const openings_close = product.openings[0].close_reason;
   function get_up(openings_close){
    if (openings_close == null) {
      const openings_close_id = null;
      return openings_close_id;
      } else {
       const openings_close_id = openings_close.id;
      return openings_close_id;
    }

   }
   function get_ways(openings_close){
    if (openings_close == null) {
      const openings_close_name = null;
      return openings_close_name;
      } else {
       const openings_close_name = openings_close.name;
      return openings_close_name;
    }

   }

   const tar = get_up(openings_close);
   const opar = get_ways(openings_close);
   const tech = get_managerid(hiring_managers);
   const mass = get_manager(hiring_managers);
   const mess = get_recs(hiring_recruiters);
   const task = get_recruiter(hiring_recruiters);
   const dir = get_name(departments);
   const czz = get_id(departments);
      data = {
        id : product.id,
        name : product.name,
        status : product.status,
        created_at : product.created_at,
        opened_at : product.opened_at,
        copied_from_id : product.copied_from_id,
        requisition_id : product.requisition_id,
        offices_id : product.offices[0].id,
        offices_name : product.offices[0].name,
        offices_location_name : product.offices[0].location.name,
        departments_id : czz,
        departments_name : dir,
        hiring_recruiters_id : task,
        hiring_recruiters_name : mess,
        hiring_managers_id : tech,
        hiring_managers_name : mass,
        openings_id: product.openings[0].id,
        openings_status : product.openings[0].status,
        openings_close_id : tar,
        openings_close_name : opar,
        custom_employment_type : product.custom_fields.employment_type,
       
      };

      records1.push(data);

}






const records = myArr.map(result =>({
  // id : resuld,
      name : result.name,
      status : result.status,
      created_at : result.created_at,
      opened_at : result.opened_at,
      copied_from_id : result.copied_from_id,
      requisition_id : result.requisition_id,
      departments_id : result.departments.id,
      departments_name : result.departments.name,
      offices_id : result.offices[0].id,
      offices_name : result.offices[0].name,
      offices_location_name : result.offices[0].location.name,
      hiring_team_recruiters : result.hiring_team.recruiters_id,
      openings_id: result.openings[0].id,
      openings_status : result.openings[0].status,
      openings_close_reason_id : result.openings.close_reason_id,
      openings_close_reason_name : result.openings.close_reason_name,
 
  }))

 csvWriter.writeRecords(records1) 
  .then(() => {
        console.log('Saved Successfully');
    });
 });