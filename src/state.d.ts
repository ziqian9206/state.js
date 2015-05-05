/**
 * Finite state machine library
 *
 * Copyright (c) 2014-5 Steelbreeze Limited
 *
 * Licensed under the MIT and GPL v3 licences
 *
 * http://www.steelbreeze.net/state.cs
 * @module fsm
 */
declare module fsm {
    /**
     * Declaration callbacks that provide transition guard conditions.
     * @interface Guard
     * @param {any} message The message that may trigger the transition.
     * @param {IActiveStateConfiguration} instance The state machine instance.
     * @param {boolean} history Internal use only
     * @returns {boolean} True if the guard condition passed.
     */
    interface Guard {
        (message: any, instance: IActiveStateConfiguration): boolean;
    }
    /**
     * Declaration for callbacks that provide state entry, state exit and transition behaviour.
     * @interface Action
     * @param {any} message The message that may trigger the transition.
     * @param {IActiveStateConfiguration} instance The state machine instance.
     * @param {boolean} history Internal use only
     * @returns {any} Actions can return any value.
     */
    interface Action {
        (message: any, instance: IActiveStateConfiguration, history: boolean): any;
    }
    /**
     * Interface for the state machine instance; an object used as each instance of a state machine (as the classes in this library describe a state machine model).
     * @interface IActiveStateConfiguration
     */
    interface IActiveStateConfiguration {
        /**
         * @member {boolean} isTerminated Indicates that the state machine instance has reached a terminate pseudo state and therfore will no longer evaluate messages.
         */
        isTerminated: boolean;
        /**
         * Updates the last known state for a given region.
         * @method setCurrent
         * @param {Region} region The region to update the last known state for.
         * @param {State} state The last known state for the given region.
         */
        setCurrent(region: Region, state: State): void;
        /**
         * Returns the last known state for a given region.
         * @method getCurrent
         * @param {Region} region The region to update the last known state for.
         * @returns {State} The last known state for the given region.
         */
        getCurrent(region: Region): State;
    }
    /**
     * Implementation of a visitor pattern.
     * @class Visitor
     */
    class Visitor<TArg> {
        /**
         * Visits an element within a state machine model.
         * @method visitElement
         * @param {Element} element the element being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitElement(element: Element, arg?: TArg): any;
        /**
         * Visits a region within a state machine model.
         * @method visitRegion
         * @param {Region} region The region being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitRegion(region: Region, arg?: TArg): any;
        /**
         * Visits a vertex within a state machine model.
         * @method visitVertex
         * @param {Vertex} vertex The vertex being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitVertex(vertex: Vertex, arg?: TArg): any;
        /**
         * Visits a pseudo state within a state machine model.
         * @method visitPseudoState
         * @param {PseudoState} pseudoState The pseudo state being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitPseudoState(pseudoState: PseudoState, arg?: TArg): any;
        /**
         * Visits a state within a state machine model.
         * @method visitState
         * @param {State} state The state being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitState(state: State, arg?: TArg): any;
        /**
         * Visits a final state within a state machine model.
         * @method visitFinal
         * @param {FinalState} finalState The final state being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitFinalState(finalState: FinalState, arg?: TArg): any;
        /**
         * Visits a state machine within a state machine model.
         * @method visitVertex
         * @param {StateMachine} state machine The state machine being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitStateMachine(stateMachine: StateMachine, arg?: TArg): any;
        /**
         * Visits a transition within a state machine model.
         * @method visitTransition
         * @param {Transition} transition The transition being visited.
         * @param {any} arg The parameter passed into the accept method.
         * @returns {any} Any value may be returned when visiting an element.
         */
        visitTransition(transition: Transition, arg?: TArg): any;
    }
    /**
     * An abstract class used as the base for the Region and Vertex classes.
     * An element is any part of the tree structure that represents a composite state machine model.
     * @class Element
     */
    class Element {
        /**
         * The symbol used to separate element names within a fully qualified name.
         * Change this static member to create different styles of qualified name generated by the toString method.
         * @member {string}
         */
        static namespaceSeparator: string;
        /**
         * The name of the element.
         * @member {string}
         */
        name: string;
        /**
         * The fully qualified name of the element.
         * @member {string}
         */
        qualifiedName: string;
        /**
         * Creates a new instance of the element class.
         * @param {string} name The name of the element.
         */
        constructor(name: string);
        /**
         * Returns the parent element of this element.
         * @method getParent
         * @returns {Element} The parent element of the element.
         */
        getParent(): Element;
        /**
         * Returns the root element within the state machine model.
         * @method root
         * @returns {StateMachine} The root state machine element.
         */
        root(): StateMachine;
        /**
         * Returns the ancestors of the element.
         * The ancestors are returned as an array of elements, staring with the root element and ending with this elemenet.
         */
        ancestors(): Array<Element>;
        /**
         * Determines if an element is active within a given state machine instance.
         * @method isActive
         * @param {IActiveStateConfiguration} instance The state machine instance.
         * @returns {boolean} True if the element is active within the state machine instance.
         */
        isActive(instance: IActiveStateConfiguration): boolean;
        /**
         * Returns a the element name as a fully qualified namespace.
         * @method toString
         * @returns {string}
         */
        toString(): string;
    }
    /**
     * An element within a state machine model that is a container of Vertices.
     *
     * Regions are implicitly inserted into composite state machines as a container for vertices.
     * They only need to be explicitly defined if orthogonal states are required.
     *
     * Region extends the Element class and inherits its public interface.
     * @class Region
     * @augments Element
     */
    class Region extends Element {
        parent: State;
        /**
         * The name given to regions that are are created automatically when a state is passed as a vertex's parent.
         * Regions are automatically inserted into state machine models as the composite structure is built; they are named using this static member.
         * Update this static member to use a different name for default regions.
         * @member {string}
         */
        static defaultName: string;
        /**
         * The set of vertices that are children of the region.
         * @member {Array<Vertex>}
         */
        vertices: Array<Vertex>;
        /**
         * The pseudo state that will be in initial starting state when entering the region explicitly.
         * @member {PseudoState}
         */
        initial: PseudoState;
        /**
         * Creates a new instance of the Region class.
         * @param {string} name The name of the region.
         * @param {State} parent The parent state that this region will be a child of.
         */
        constructor(name: string, parent: State);
        /**
         * Returns the parent element of this region.
         * @method getParent
         * @returns {Element} The parent element of the region.
         */
        getParent(): Element;
        /**
         * Tests a region to determine if it is deemed to be complete.
         * A region is complete if its current state is final (a state having on outbound transitions).
         * @method isComplete
         * @param {IActiveStateConfiguration} instance The object representing a particular state machine instance.
         * @returns {boolean} True if the region is deemed to be complete.
         */
        isComplete(instance: IActiveStateConfiguration): boolean;
        evaluate(message: any, instance: IActiveStateConfiguration): boolean;
        /**
         * Accepts an instance of a visitor and calls the visitRegion method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * An abstract element within a state machine model that can be the source or target of a transition (states and pseudo states).
     *
     * Vertex extends the Element class and inherits its public interface.
     * @class Vertex
     * @augments Element
     */
    class Vertex extends Element {
        region: Region;
        transitions: Array<Transition>;
        constructor(name: string, parent: Region);
        constructor(name: string, parent: State);
        /**
         * Returns the parent element of this vertex.
         * @method getParent
         * @returns {Element} The parent element of the vertex.
         */
        getParent(): Element;
        /**
         * Tests the vertex to determine if it is deemed to be complete.
         * Pseudo states and simple states are always deemed to be complete.
         * Composite states are deemed to be complete when all its child regions all are complete.
         * @method isComplete
         * @param {IActiveStateConfiguration} instance The object representing a particular state machine instance.
         * @returns {boolean} True if the vertex is deemed to be complete.
         */
        isComplete(instance: IActiveStateConfiguration): boolean;
        /**
         * Creates a new transition from this vertex.
         * Newly created transitions are completion transitions; they will be evaluated after a vertex has been entered if it is deemed to be complete.
         * Transitions can be converted to be event triggered by adding a guard condition via the transitions `where` method.
         * @method to
         * @param {Vertex} target The destination of the transition; omit for internal transitions.
         * @returns {Transition} The new transition object.
         */
        to(target?: Vertex): Transition;
        evaluateCompletions(message: any, instance: IActiveStateConfiguration, history: boolean): void;
        select(message: any, instance: IActiveStateConfiguration): Transition;
        evaluate(message: any, instance: IActiveStateConfiguration): boolean;
        /**
         * Accepts an instance of a visitor.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * An enumeration of static constants that dictates the precise behaviour of pseudo states.
     *
     * Use these constants as the `kind` parameter when creating new `PseudoState` instances.
     * @class PseudoStateKind
     */
    enum PseudoStateKind {
        /**
         * Used for pseudo states that are always the staring point when entering their parent region.
         * @member {number} Initial
         */
        Initial = 0,
        /**
         * Used for pseudo states that are the the starting point when entering their parent region for the first time; subsequent entries will start at the last known state.
         * @member {number} ShallowHistory
         */
        ShallowHistory = 1,
        /**
         * As per `ShallowHistory` but the history semantic cascades through all child regions irrespective of their initial pseudo state kind.
         * @member {number} DeepHistory
         */
        DeepHistory = 2,
        /**
         * Enables a dynamic conditional branches; within a compound transition.
         * All outbound transition guards from a Choice are evaluated upon entering the PseudoState:
         * if a single transition is found, it will be traversed;
         * if many transitions are found, an arbitary one will be selected and traversed;
         * if none evaluate true, and there is no 'else transition' defined, the machine is deemed illformed and an exception will be thrown.
         * @member {number} Choice
         */
        Choice = 3,
        /**
         * Enables a static conditional branches; within a compound transition.
         * All outbound transition guards from a Choice are evaluated upon entering the PseudoState:
         * if a single transition is found, it will be traversed;
         * if many or none evaluate true, and there is no 'else transition' defined, the machine is deemed illformed and an exception will be thrown.
         * @member {number} Junction
         */
        Junction = 4,
        /**
         * Entering a terminate `PseudoState` implies that the execution of this state machine by means of its state object is terminated.
         * @member {number} Terminate
         */
        Terminate = 5,
    }
    /**
     * An element within a state machine model that represents an transitory Vertex within the state machine model.
     *
     * Pseudo states are required in all state machine models; at the very least, an `Initial` pseudo state is the default stating state when the parent region is entered.
     * Other types of pseudo state are available; typically for defining history semantics or to facilitate more complex transitions.
     * A `Terminate` pseudo state kind is also available to immediately terminate processing within the entire state machine instance.
     *
     * PseudoState extends the Vertex class and inherits its public interface.
     * @class PseudoState
     * @augments Vertex
     */
    class PseudoState extends Vertex {
        kind: PseudoStateKind;
        /**
         * Creates a new instance of the PseudoState class.
         * @param {string} name The name of the pseudo state.
         * @param {Region} parent The parent region that this pseudo state will be a child of.
         * @param {PseudoStateKind} kind Determines the behaviour of the PseudoState.
         */
        constructor(name: string, parent: Region, kind: PseudoStateKind);
        /**
         * Creates a new instance of the PseudoState class.
         * @param {string} name The name of the pseudo state.
         * @param {State} parent The parent state that this pseudo state will be a child of.
         * @param {PseudoStateKind} kind Determines the behaviour of the PseudoState.
         */
        constructor(name: string, parent: State, kind: PseudoStateKind);
        /**
         * Tests the vertex to determine if it is deemed to be complete.
         * Pseudo states and simple states are always deemed to be complete.
         * Composite states are deemed to be complete when all its child regions all are complete.
         * @method isComplete
         * @param {IActiveStateConfiguration} instance The object representing a particular state machine instance.
         * @returns {boolean} True if the vertex is deemed to be complete.
         */
        isComplete(instance: IActiveStateConfiguration): boolean;
        isHistory(): boolean;
        isInitial(): boolean;
        select(message: any, instance: IActiveStateConfiguration): Transition;
        /**
         * Accepts an instance of a visitor and calls the visitPseudoState method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * An element within a state machine model that represents an invariant condition within the life of the state machine instance.
     *
     * States are one of the fundamental building blocks of the state machine model.
     * Behaviour can be defined for both state entry and state exit.
     *
     * State extends the Vertex class and inherits its public interface.
     * @class State
     * @augments Vertex
     */
    class State extends Vertex {
        exitBehavior: Array<Action>;
        entryBehavior: Array<Action>;
        regions: Array<Region>;
        /**
         * Creates a new instance of the State class.
         * @param {string} name The name of the state.
         * @param {Region} parent The parent region that owns the state.
         */
        constructor(name: string, parent: Region);
        /**
         * Creates a new instance of the State class.
         * @param {string} name The name of the state.
         * @param {State} parent The parent state that owns the state.
         */
        constructor(name: string, parent: State);
        defaultRegion(): Region;
        /**
         * Determines if an element is active within a given state machine instance.
         * @method isActive
         * @param {IActiveStateConfiguration} instance The state machine instance.
         * @returns {boolean} True if the element is active within the state machine instance.
         */
        isActive(instance: IActiveStateConfiguration): boolean;
        /**
         * Tests the state to see if it is a final state;
         * a final state is one that has no outbound transitions.
         * @method isFinal
         * @returns {boolean} True if the state is a final state.
         */
        isFinal(): boolean;
        /**
         * Tests the state to see if it is a simple state;
         * a simple state is one that has no child regions.
         * @method isSimple
         * @returns {boolean} True if the state is a simple state.
         */
        isSimple(): boolean;
        /**
         * Tests the state to see if it is a composite state;
         * a composite state is one that has one or more child regions.
         * @method isComposite
         * @returns {boolean} True if the state is a composite state.
         */
        isComposite(): boolean;
        /**
         * Tests the state to see if it is an orthogonal state;
         * an orthogonal state is one that has two or more child regions.
         * @method isOrthogonal
         * @returns {boolean} True if the state is an orthogonal state.
         */
        isOrthogonal(): boolean;
        /**
         * Tests a region to determine if it is deemed to be complete.
         * A region is complete if its current state is final (a state having on outbound transitions).
         * @method isComplete
         * @param {IActiveStateConfiguration} instance The object representing a particular state machine instance.
         * @returns {boolean} True if the region is deemed to be complete.
         */
        isComplete(instance: IActiveStateConfiguration): boolean;
        /**
         * Adds behaviour to a state that is executed each time the state is exited.
         * @method exit
         * @param {Action} exitAction The action to add to the state's exit behaviour.
         * @returns {State} Returns the state to allow a fluent style API.
         */
        exit<TMessage>(exitAction: Action): State;
        /**
         * Adds behaviour to a state that is executed each time the state is entered.
         * @method entry
         * @param {Action} entryAction The action to add to the state's entry behaviour.
         * @returns {State} Returns the state to allow a fluent style API.
         */
        entry<TMessage>(entryAction: Action): State;
        select(message: any, instance: IActiveStateConfiguration): Transition;
        evaluate(message: any, instance: IActiveStateConfiguration): boolean;
        /**
         * Accepts an instance of a visitor and calls the visitState method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * An element within a state machine model that represents completion of the life of the containing Region within the state machine instance.
     *
     * A final state cannot have outbound transitions.
     *
     * FinalState extends the State class and inherits its public interface.
     * @class FinalState
     * @augments State
     */
    class FinalState extends State {
        /**
         * Creates a new instance of the FinalState class.
         * @param {string} name The name of the final state.
         * @param {Region} parent The parent region that owns the final state.
         */
        constructor(name: string, parent: Region);
        /**
         * Creates a new instance of the FinalState class.
         * @param {string} name The name of the final state.
         * @param {State} parent The parent state that owns the final state.
         */
        constructor(name: string, parent: State);
        to(target?: Vertex): Transition;
        /**
         * Accepts an instance of a visitor and calls the visitFinalState method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * An element within a state machine model that represents the root of the state machine model.
     *
     * StateMachine extends the State class and inherits its public interface.
     * @class StateMachine
     * @augments State
     */
    class StateMachine extends State {
        private static bootstrap;
        init: Array<Action>;
        clean: boolean;
        /**
         * Creates a new instance of the StateMachine class.
         * @param {string} name The name of the state machine.
         */
        constructor(name: string);
        /**
         * Returns the root element within the state machine model.
         * Note that if this state machine is embeded within another state machine, the ultimate root element will be returned.
         * @method root
         * @returns {StateMachine} The root state machine element.
         */
        root(): StateMachine;
        /**
         * Determines if an element is active within a given state machine instance.
         * @method isActive
         * @param {IActiveStateConfiguration} instance The state machine instance.
         * @returns {boolean} True if the element is active within the state machine instance.
         */
        isActive(instance: IActiveStateConfiguration): boolean;
        /**
         * Bootstraps the state machine model; precompiles the actions to take during transition traversal.
         *
         * Bootstrapping a state machine model pre-calculates all the actions required for each transition within the state machine model.
         * The actions will exit all states as appropriate, perform transition behaviour, enter all states as appropriate and update the current state.
         *
         * This is only required if you are dynamically changing the state machine model and want to manually control when the model is bootstrapped.
         * @method bootstrap
         */
        initialiseModel(): void;
        /**
         * Initialises an instance of the state machine and enters its initial pseudo state.
         * Entering the initial pseudo state may cause a chain of other completion transitions.
         * @method initialise
         * @param {IActiveStateConfiguration} instance The object representing a particular state machine instance.
         * @param {boolean} autoBootstrap Set to false to manually control when bootstrapping occurs.
         */
        initialise(instance: IActiveStateConfiguration, autoBootstrap?: boolean): void;
        /**
         * Passes a message to a state machine instance for evaluation.
         *
         * The message will cause the guard conditions of outbound transitions from the current state to be evaluated; if a single guard evaluates true, it will trigger transition traversal.
         * Transition traversal may cause a chain of transitions to be traversed.
         * @method evaluate
         * @param {any} message A message to pass to a state machine instance for evaluation that may cause a state transition.
         * @param {IActiveStateConfiguration} instance The object representing a particular state machine instance.
         * @param {boolean} autoBootstrap Set to false to manually control when bootstrapping occurs.
         * @returns {boolean} True if the method caused a state transition.
         */
        evaluate(message: any, instance: IActiveStateConfiguration, autoBootstrap?: boolean): boolean;
        /**
         * Accepts an instance of a visitor and calls the visitStateMachine method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * A transition between vertices (states or pseudo states) that may be traversed in response to a message.
     *
     * Transitions come in a variety of types:
     * internal transitions respond to messages but do not cause a state transition, they only have behaviour;
     * local transitions are contained within a single region therefore the source vertex is exited, the transition traversed, and the target state entered;
     * external transitions are more complex in nature as they cross region boundaries, all elements up to but not not including the common ancestor are exited and entered.
     *
     * Entering a composite state will cause the entry of the child regions within the composite state; this in turn may trigger more transitions.
     * @class Transition
     */
    class Transition {
        source: Vertex;
        target: Vertex;
        static isElse: (message: any, instance: IActiveStateConfiguration) => boolean;
        guard: Guard;
        transitionBehavior: Array<(message: any, instance: IActiveStateConfiguration, history: boolean) => any>;
        traverse: Array<(message: any, instance: IActiveStateConfiguration, history: boolean) => any>;
        /**
         * Creates a new instance of the Transition class.
         * @param {Vertex} source The source of the transition.
         * @param {Vertex} source The target of the transition.
         */
        constructor(source: Vertex, target?: Vertex);
        /**
         * Turns a transition into an else transition.
         *
         * Else transitions can be used at `Junction` or `Choice` pseudo states if no other transition guards evaluate true, an Else transition if present will be traversed.
         * @method else
         * @returns {Transition} Returns the transition object to enable the fluent API.
         */
        else(): Transition;
        /**
         * Defines the guard condition for the transition.
         * @method when
         * @param {Guard} guard The guard condition that must evaluate true for the transition to be traversed.
         * @returns {Transition} Returns the transition object to enable the fluent API.
         */
        when(guard: Guard): Transition;
        /**
         * Add behaviour to a transition.
         * @method effect
         * @param {Action} transitionAction The action to add to the transitions traversal behaviour.
         * @returns {Transition} Returns the transition object to enable the fluent API.
         */
        effect<TMessage>(transitionAction: Action): Transition;
        /**
         * Accepts an instance of a visitor and calls the visitTransition method on it.
         * @method accept
         * @param {Visitor<TArg>} visitor The visitor instance.
         * @param {TArg} arg An optional argument to pass into the visitor.
         * @returns {any} Any value can be returned by the visitor.
         */
        accept<TArg>(visitor: Visitor<TArg>, arg?: TArg): any;
    }
    /**
     * Default working implementation of a state machine instance class.
     *
     * Implements the `IActiveStateConfiguration` interface.
     * It is possible to create other custom instance classes to manage state machine state in any way (e.g. as serialisable JSON); just implement the same members and methods as this class.
     * @class Context
     * @implements IActiveStateConfiguration
     */
    class StateMachineInstance implements IActiveStateConfiguration {
        name: string;
        isTerminated: boolean;
        private last;
        constructor(name?: string);
        /**
         * Updates the last known state for a given region.
         * @method setCurrent
         * @param {Region} region The region to update the last known state for.
         * @param {State} state The last known state for the given region.
         */
        setCurrent(region: Region, state: State): void;
        /**
         * Returns the last known state for a given region.
         * @method getCurrent
         * @param {Region} region The region to update the last known state for.
         * @returns {State} The last known state for the given region.
         */
        getCurrent(region: Region): State;
        toString(): string;
    }
}
