#==================================================================================================
# OpalExtensions.View
# Author: Sergio Morales L.
#
# The OpalExtensions.View class extends the basic Backbone.View to provide controlled mechanisms
# for rendering data templates, manipulate the DOM and declare data bindings between DOM elements
# and data models/collections.
#
# It also encapsulates a default implementation of three of the basic REST actions:
#   create
#     Just like the server-side implementation, the 'new' action provides a form to populate a new
#     object's fields, and the 'create' action performs the save operation.
#   update
#     Similar to the 'new' => 'create' equivalence, the 'edit' action needs a 'update' action to
#     perform the save operation.
#   destroy
#     This action is used to (guessed it already?) destroy a model.
#
# You should check the documentation on each method so you can know what to expect from each of
# them. NOTE: These are only default implementations that should fit some common use cases, but
# they can be easily ditched, just write your own implementation in each specific view and avoid
# calling super().
#==================================================================================================

class OpalExtensions.View extends Backbone.View

  #================================================================================================
  # Setup
  #================================================================================================

  _.extend(@, OpalExtensions.Mixin)

  @include OpalExtensions.ViewManager

  #================================================================================================
  # Defaults
  #================================================================================================

  initialize: () ->
    super(arguments...)
    _.bindAll(@)
    @_afterCreate = @_afterUpdate = @_afterDestroy = []
    @initializeDefaultCallbacks()

  initializeDefaultCallbacks: () ->
    @afterCreate @goToShow
    @afterUpdate @goToShow
    @afterDestroy @goToIndex

  bindings: () ->
    throw new Error('You must define the bindings method in your view!')

  events:
    {
      "click .close-self" : "close"
    }

  #================================================================================================
  # CUD - CRUD without the Read part
  #================================================================================================

  # Attempts to create the model stored in @model and add it to the View's @collection
  create: (options) ->
    @collection.create(@model)
    @remove()
    @callbacksFor(@_afterCreate, [@model])

  # Attempts to update the model stored in @model
  update: (options) ->
    @model.save()
    @remove()
    @callbacksFor(@_afterUpdate, [@model])

  # Attempts to destroy a model specified whether by a provided 'id' or the View's @model.
  destroy: (id, options) ->
    if id? and @collection?
      @collection.get(id).destroy()
      @collection.remove(@collection.get(id))
    else if @model?
      @model.destroy()
      @remove()
    else throw new Error('Missing reference for destroying an object, forgot to supply an ID?')
    @callbacksFor(@_afterDestroy, [@model])

  #================================================================================================
  # Callback registrators
  #================================================================================================

  callbacksFor: (callbacksCollection, args) ->
    _.each(callbacksCollection, (func) ->
      func.apply(@, args)
    )
    @

  afterCreate: (func) ->
    @_afterCreate.push func

  afterUpdate: (func) ->
    @_afterUpdate.push func

  afterDestroy: (func) ->
    @_afterDestroy.push func

  #================================================================================================
  # Render methods
  #================================================================================================

  # Renders a template with the specified context's data
  renderData: (template, context) ->
    @$el.html(template(context))
    @

  # Renders a template with the specified model's data
  renderResource: (template, model) ->
    @$el.html(template())
    @modelBinder.bind(model, @el, @bindings())
    @

  # Renders a template using a collection of data, useful for rendering a list of data.
  # A jQuery containerSelector is used to append each of the list's items, this selector would
  # usually be a tbody or a div element.
  # This alternative render method makes use of a Backbone.CollectionBinder and will brutally
  # fail if @collectionBinder does not contain an instance of that Object.
  renderCollection: (template, collection, containerSelector) ->
    collection.fetch(
      success: () =>
        @$el.html(template())
        @collectionBinder.bind(collection, @$(containerSelector))
    )
    @

  #================================================================================================
  # DOM manipulation
  #================================================================================================

  # This is the default handler for the close button click event. This event comes bundled with
  # the default events object but it can be overriden for custom behavior.
  close: (e) ->
    e.preventDefault()
    @remove()
    @goToIndex()

  # This removes the view from the DOM after unbinding any models and collection contained within.
  remove: () ->
    @modelBinder.unbind() if @modelBinder?
    @collectionBinder.unbind() if @collectionBinder?
    @$el.remove()

  #================================================================================================
  # Navigation helpers
  #================================================================================================

   goToIndex: () ->
     Backbone.history.location.assign(@indexPath())

   goToShow: () ->
     Backbone.history.location.assign(@showPath())

  #================================================================================================
  # Route helpers
  #================================================================================================

  # Returns the plain resource root path using a provided model instance.
  # Providing a non-existent model or not providing it at all will still try to get the model
  # stored on the View's @model attribute, or in the @collection attribute if the first one does
  # not exist.
  getRootPath: (model) ->
    model?.urlRoot || @model?.urlRoot || @collection?.url

  # Returns the id of the provided resource, or the id of the View's @model attribute.
  getResourceId: (model) ->
    model?.id || @model?.id

  # This helper returns the index or root route of the view's resource. Alternatively, a model
  # can be passed as an optional argument to extract the urlRoot from there.
  indexPath: (model) ->
    urlRoot = @getRootPath(model)
    "##{urlRoot}"

  # This helper is used as a ModelBinder converter, useful for creating model's based show routes.
  showPath: (direction, value, attribute, model) ->
    urlRoot = @getRootPath(model)
    id = @getResourceId(model)
    "##{urlRoot}/#{id}"

  # This helper is used as a ModelBinder converter, useful for creating model's based edit routes.
  editPath: (direction, value, attribute, model) ->
    "#{@showPath(arguments...)}/edit"
