using System;
using System.Collections.Generic;
using System.Linq;
using Crestron.SimplSharpPro.DeviceSupport;
using Crestron.SimplSharpPro;

namespace HPE_StandardContract1
{
    /// <summary>
    /// Common Interface for Root Contracts.
    /// </summary>
    public interface IContract
    {
        object UserObject { get; set; }
        void AddDevice(BasicTriListWithSmartObject device);
        void RemoveDevice(BasicTriListWithSmartObject device);
    }

    public class Contract : IContract, IDisposable
    {
        #region Components

        private ComponentMediator ComponentMediator { get; set; }

        public HPE_StandardContract1.ISystemDetails SystemDetails { get { return (HPE_StandardContract1.ISystemDetails)InternalSystemDetails; } }
        private HPE_StandardContract1.SystemDetails InternalSystemDetails { get; set; }

        public HPE_StandardContract1.IIntegratorDetails IntegratorDetails { get { return (HPE_StandardContract1.IIntegratorDetails)InternalIntegratorDetails; } }
        private HPE_StandardContract1.IntegratorDetails InternalIntegratorDetails { get; set; }

        public HPE_StandardContract1.IMobileConnectionDetails MobileConnectionDetails { get { return (HPE_StandardContract1.IMobileConnectionDetails)InternalMobileConnectionDetails; } }
        private HPE_StandardContract1.MobileConnectionDetails InternalMobileConnectionDetails { get; set; }

        public HPE_StandardContract1.IGeneralControls GeneralControls { get { return (HPE_StandardContract1.IGeneralControls)InternalGeneralControls; } }
        private HPE_StandardContract1.GeneralControls InternalGeneralControls { get; set; }

        public HPE_StandardContract1.IPopupCsInterface PopupCsInterface { get { return (HPE_StandardContract1.IPopupCsInterface)InternalPopupCsInterface; } }
        private HPE_StandardContract1.PopupCsInterface InternalPopupCsInterface { get; set; }

        public HPE_StandardContract1.IInterfaceDetails[] InterfaceDetails { get { return InternalInterfaceDetails.Cast<HPE_StandardContract1.IInterfaceDetails>().ToArray(); } }
        private HPE_StandardContract1.InterfaceDetails[] InternalInterfaceDetails { get; set; }

        #endregion

        #region Construction and Initialization

        private static readonly IDictionary<int, uint> InterfaceDetailsSmartObjectIdMappings = new Dictionary<int, uint>{
            { 0, 6 }, { 1, 7 }, { 2, 8 }, { 3, 9 }, { 4, 10 }};

        public Contract()
            : this(new List<BasicTriListWithSmartObject>().ToArray())
        {
        }

        public Contract(BasicTriListWithSmartObject device)
            : this(new [] { device })
        {
        }

        public Contract(BasicTriListWithSmartObject[] devices)
        {
            if (devices == null)
                throw new ArgumentNullException("Devices is null");

            ComponentMediator = new ComponentMediator();

            InternalSystemDetails = new HPE_StandardContract1.SystemDetails(ComponentMediator, 1);
            InternalIntegratorDetails = new HPE_StandardContract1.IntegratorDetails(ComponentMediator, 2);
            InternalMobileConnectionDetails = new HPE_StandardContract1.MobileConnectionDetails(ComponentMediator, 3);
            InternalGeneralControls = new HPE_StandardContract1.GeneralControls(ComponentMediator, 4);
            InternalPopupCsInterface = new HPE_StandardContract1.PopupCsInterface(ComponentMediator, 5);
            InternalInterfaceDetails = new HPE_StandardContract1.InterfaceDetails[InterfaceDetailsSmartObjectIdMappings.Count];
            for (int index = 0; index < InterfaceDetailsSmartObjectIdMappings.Count; index++)
            {
                InternalInterfaceDetails[index] = new HPE_StandardContract1.InterfaceDetails(ComponentMediator, InterfaceDetailsSmartObjectIdMappings[index]);
            }

            for (int index = 0; index < devices.Length; index++)
            {
                AddDevice(devices[index]);
            }
        }

        public static void ClearDictionaries()
        {
            InterfaceDetailsSmartObjectIdMappings.Clear();

        }

        #endregion

        #region Standard Contract Members

        public object UserObject { get; set; }

        public void AddDevice(BasicTriListWithSmartObject device)
        {
            InternalSystemDetails.AddDevice(device);
            InternalIntegratorDetails.AddDevice(device);
            InternalMobileConnectionDetails.AddDevice(device);
            InternalGeneralControls.AddDevice(device);
            InternalPopupCsInterface.AddDevice(device);
            for (int index = 0; index < 5; index++)
            {
                InternalInterfaceDetails[index].AddDevice(device);
            }
        }

        public void RemoveDevice(BasicTriListWithSmartObject device)
        {
            InternalSystemDetails.RemoveDevice(device);
            InternalIntegratorDetails.RemoveDevice(device);
            InternalMobileConnectionDetails.RemoveDevice(device);
            InternalGeneralControls.RemoveDevice(device);
            InternalPopupCsInterface.RemoveDevice(device);
            for (int index = 0; index < 5; index++)
            {
                InternalInterfaceDetails[index].RemoveDevice(device);
            }
        }

        #endregion

        #region IDisposable

        public bool IsDisposed { get; set; }

        public void Dispose()
        {
            if (IsDisposed)
                return;

            IsDisposed = true;

            InternalSystemDetails.Dispose();
            InternalIntegratorDetails.Dispose();
            InternalMobileConnectionDetails.Dispose();
            InternalGeneralControls.Dispose();
            InternalPopupCsInterface.Dispose();
            for (int index = 0; index < 5; index++)
            {
                InternalInterfaceDetails[index].Dispose();
            }
            ComponentMediator.Dispose(); 
        }

        #endregion

    }
}
