interface ILog {
   log_id: string
   log_date: Date
   log_action: string
   entity_type: string
   entity_id: string
   entity_field: string
   new_value: string
   old_value: string
}

export default class LogModel implements ILog {
   log_id: string
   log_date: Date
   log_action: string
   entity_type: string
   entity_id: string
   entity_field: string
   new_value: string
   old_value: string

   constructor(
      log_id: string,
      log_date: Date,
      log_action: string,
      entity_type: string,
      entity_id: string,
      entity_field: string,
      new_value: string,
      old_value: string
   ) {
      this.log_id = log_id
      this.log_date = log_date
      this.log_action = log_action
      this.entity_type = entity_type
      this.entity_id = entity_id
      this.entity_field = entity_field
      this.new_value = new_value
      this.old_value = old_value
   }
}
