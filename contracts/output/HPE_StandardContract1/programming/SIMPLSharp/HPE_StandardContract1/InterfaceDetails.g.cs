using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace HPE_StandardContract1
{
    public interface IInterfaceDetails
    {
        object UserObject { get; set; }

        event EventHandler<UIEventArgs> ActivePage_Set;

        void ActivePage(InterfaceDetailsStringInputSigDelegate callback);

    }

    public delegate void InterfaceDetailsStringInputSigDelegate(StringInputSig stringInputSig, IInterfaceDetails interfaceDetails);

    internal class InterfaceDetails : IInterfaceDetails, IDisposable
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
            internal static class Strings
            {
                public const uint ActivePage_Set = 1;

                public const uint ActivePage = 1;
            }
        }

        #endregion

        #region Construction and Initialization

        internal InterfaceDetails(ComponentMediator componentMediator, uint controlJoinId)
        {
            ComponentMediator = componentMediator;
            Initialize(controlJoinId);
        }

        private void Initialize(uint controlJoinId)
        {
            ControlJoinId = controlJoinId; 
 
            _devices = new List<BasicTriListWithSmartObject>(); 
 
            ComponentMediator.ConfigureStringEvent(controlJoinId, Joins.Strings.ActivePage_Set, onActivePage_Set);

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

        public event EventHandler<UIEventArgs> ActivePage_Set;
        private void onActivePage_Set(SmartObjectEventArgs eventArgs)
        {
            EventHandler<UIEventArgs> handler = ActivePage_Set;
            if (handler != null)
                handler(this, UIEventArgs.CreateEventArgs(eventArgs));
        }


        public void ActivePage(InterfaceDetailsStringInputSigDelegate callback)
        {
            for (int index = 0; index < Devices.Count; index++)
            {
                callback(Devices[index].SmartObjects[ControlJoinId].StringInput[Joins.Strings.ActivePage], this);
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
            return string.Format("Contract: {0} Component: {1} HashCode: {2} {3}", "InterfaceDetails", GetType().Name, GetHashCode(), UserObject != null ? "UserObject: " + UserObject : null);
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            ActivePage_Set = null;
        }

        #endregion

    }
}
