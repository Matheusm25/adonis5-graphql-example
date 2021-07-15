import MakeCRUDController from 'App/Controllers/Http/MakeCRUDController';

export default async function makeResolver({ model, controller = null }) {
  const Controller = controller
    ? (await import(`App/Controllers/Http/${controller}`)).default
    : MakeCRUDController(model);
  const entityController = new Controller(model);
  return entityController.getMethods();
}
