use brightness::Brightness;
use futures::TryStreamExt;

pub struct MonitorService;

#[derive(Debug)]
pub struct Monitor {
    pub name: String,
    pub brightness: u32,
    pub key: String,
}

impl MonitorService {
    pub async fn show_monitor_info() {
        let devices: Vec<Monitor> = brightness::brightness_devices()
            .try_filter_map(|dev| async move {
                let name = dev.device_name().await.unwrap_or_default();
                let key = dev.device_name().await.unwrap_or_default();
                let brightness = dev.get().await.unwrap_or(0);

                Ok(Some(Monitor {
                    name,
                    key,
                    brightness,
                }))
            })
            .try_collect()
            .await
            .unwrap_or_default();

        println!("{:?}", devices)
    }
}
