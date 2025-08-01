using System;
using System.Collections.Generic; // Required for List if you expand state

// --- 1. State ---
// Represents the entire state of our application.
// It should be immutable, meaning we create new instances when state changes.
public record AppState
{
    public int Count { get; init; } = 0; // 'init' makes it immutable after construction
}

// --- 2. Actions ---
// Actions are plain objects that describe what happened.
// They typically have a 'Type' or a clear name.
// We'll use simple record types for actions.
public record IncrementAction;
public record DecrementAction;
public record ResetAction; // New action for resetting the counter

// --- 3. Reducer ---
// A pure function that takes the current state and an action,
// and returns a new state. It must not modify the original state.
public static class AppReducer
{
    public static AppState Reduce(AppState currentState, object action)
    {
        // Pattern matching on the action type to determine how to update the state
        return action switch
        {
            IncrementAction => currentState with { Count = currentState.Count + 1 },
            DecrementAction => currentState with { Count = currentState.Count - 1 },
            ResetAction => currentState with { Count = 0 }, // Handle ResetAction
            _ => currentState // If action is not recognized, return current state unchanged
        };
    }
}

// --- 4. Store ---
// The central object that holds the application state.
// It provides methods to dispatch actions and subscribe to state changes.
public class Store
{
    private AppState _currentState;
    private readonly Func<AppState, object, AppState> _reducer;
    private readonly List<Action<AppState>> _subscribers = new List<Action<AppState>>();

    public Store(AppState initialState, Func<AppState, object, AppState> reducer)
    {
        _currentState = initialState;
        _reducer = reducer;
    }

    public AppState GetState()
    {
        return _currentState;
    }

    // Dispatches an action, which triggers the reducer and notifies subscribers.
    public void Dispatch(object action)
    {
        _currentState = _reducer(_currentState, action);
        NotifySubscribers();
    }

    // Allows components to "listen" for state changes.
    public void Subscribe(Action<AppState> subscriber)
    {
        _subscribers.Add(subscriber);
    }

    // Notifies all subscribed listeners about the state change.
    private void NotifySubscribers()
    {
        foreach (var subscriber in _subscribers)
        {
            subscriber(_currentState);
        }
    }
}

// --- 5. Program Entry Point ---
// Our console application demonstrating the Redux pattern.
public class Program
{
    public static void Main(string[] args)
    {
        
        var store = new Store(new AppState(), AppReducer.Reduce);

        
        store.Subscribe(state =>
        {
            Console.WriteLine($"Current Count: {state.Count}");
        });

        Console.WriteLine("Redux-Inspired C# Counter");
        Console.WriteLine("-------------------------");

        
        Console.WriteLine("\nDispatching IncrementAction:");
        store.Dispatch(new IncrementAction()); 

        Console.WriteLine("\nDispatching IncrementAction:");
        store.Dispatch(new IncrementAction()); 

        Console.WriteLine("\nDispatching DecrementAction:");
        store.Dispatch(new DecrementAction()); 

        Console.WriteLine("\nDispatching ResetAction:");
        store.Dispatch(new ResetAction()); 

        Console.WriteLine("\nDispatching IncrementAction three times:");
        store.Dispatch(new IncrementAction());
        store.Dispatch(new IncrementAction());
        store.Dispatch(new IncrementAction()); 

        Console.WriteLine("\nPress any key to exit.");
        Console.ReadKey();
    }
}
