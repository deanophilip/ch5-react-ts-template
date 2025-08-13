using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace HPE_StandardContract1
{
    public interface IGeneralControls
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> MainVolumeMute_Set;
        event EventHandler<UIEventArgs> MainVolumeUp_Set;
        event EventHandler<UIEventArgs> MainVolumeDown_Set;
        event EventHandler<UIEventArgs> MainVolume_Set;

        void MainVolumeMute(GeneralControlsBoolInputSigDelegate callback);
        void MainVolumeUp(GeneralControlsBoolInputSigDelegate callback);
        void MainVolumeDown(GeneralControlsBoolInputSigDelegate callback);
        void MainVolume(GeneralControlsUShortInputSigDelegate callback);

    }

    public delegate void GeneralControlsBoolInputSigDelegate(BoolInputSig boolInputSig, IGeneralControls generalControls);
    public delegate void GeneralControlsUShortInputSigDelegate(UShortInputSig uShortInputSig, IGeneralControls generalControls);

    internal class GeneralControls : IGeneralControls, IDisposable
    {
        #region Standard CH5 Component members

        private ComponentMediator ComponentMediator { get; set; }

        public object UserObject { get; set; }

        public uint ControlJoinId { get; private set; }

        private IList<BasicTriListWithSmartObject> _devices;
        public IList<BasicTriListWithSmartObject> Devices { get { return _devices; } }

        #endregion

        #region Joins

        private static class Joins
        {
            internal static class Booleans
            {
                public const uint MainVolumeMute_Set = 1;
                public const uint MainVolumeUp_Set = 2;
                public const uint MainVolumeDown_Set = 3;

                public const uint MainVolumeMute = 1;
                public const uint MainVolumeUp = 2;
                public const uint MainVolumeDown = 3;
            }
            internal static class Numerics
            {
                public const uint MainVolume_Set = 1;

                public const uint MainVolume = 1;
            }
        }

        #endregion

        #region Construction and Initialization

        internal GeneralControls(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.MainVolumeMute_Set, onMainVolumeMute_Set);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.MainVolumeUp_Set, onMainVolumeUp_Set);
            ComponentMediator.ConfigureBooleanEvent(controlJoinId, Joins.Booleans.MainVolumeDown_Set, onMainVolumeDown_Set);
            ComponentMediator.ConfigureNumericEvent(controlJoinId, Joins.Numerics.MainVolume_Set, onMainVolume_Set);

        }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            Devices.Add(device);
            ComponentMediator.HookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            Devices.Remove(device);
            ComponentMediator.UnHookSmartObjectEvents(device.SmartObjects[ControlJoinId]);
        }

        #endregion

        #region CH5 Contract

        public event EventHandler<UIEventArgs> MainVolumeMute_Set;
        private void onMainVolumeMute_Set(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = MainVolumeMute_Set;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> MainVolumeUp_Set;
        private void onMainVolumeUp_Set(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = MainVolumeUp_Set;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }

        public event EventHandler<UIEventArgs> MainVolumeDown_Set;
        private void onMainVolumeDown_Set(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = MainVolumeDown_Set;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void MainVolumeMute(GeneralControlsBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.MainVolumeMute], this);
            }
        }

        public void MainVolumeUp(GeneralControlsBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.MainVolumeUp], this);
            }
        }

        public void MainVolumeDown(GeneralControlsBoolInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].BooleanInput[Joins.Booleans.MainVolumeDown], this);
            }
        }

        public event EventHandler<UIEventArgs> MainVolume_Set;
        private void onMainVolume_Set(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = MainVolume_Set;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void MainVolume(GeneralControlsUShortInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].UShortInput[Joins.Numerics.MainVolume], this);
            }
        }

        #endregion

        #region Overrides

        public override int GetHashCode()
        {
            return (int)ControlJoinId;
        }

        public override string ToString()
        {
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "GeneralControls", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            MainVolumeMute_Set = null;
            MainVolumeUp_Set = null;
            MainVolumeDown_Set = null;
            MainVolume_Set = null;
        }

        #endregion

    }
}
